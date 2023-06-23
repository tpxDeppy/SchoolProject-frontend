import { queries, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { SearchPeopleProvider } from "@/pages/searchPeople/searchPeopleContext";
import PeopleSearchPage from "@/pages/searchPeople";

//mocking the Link functionality
jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ children, href }) => <a href={href}>{children}</a>,
  };
});

const renderComponent = () => {
  const schools = [
    { schoolID: 1, schoolName: "School 1" },
    { schoolID: 2, schoolName: "School 2" },
  ];

  const classes = [
    { classID: 1, className: "Class 1" },
    { classID: 2, className: "Class 2" },
  ];

  render(
    <SearchPeopleProvider>
      <PeopleSearchPage schools={schools} classes={classes} />
      {/* <SearchPeopleContext.Consumer>
        {(context) => {
          console.log(context.searchResults);
          return null;
        }}
      </SearchPeopleContext.Consumer> */}
    </SearchPeopleProvider>
  );
};

const apiUrl = process.env.NEXT_PUBLIC_HOST;
const data = [
  {
    userID: "user1",
    firstName: "Anna",
    lastName: "Prime",
    schoolName: "School 1",
    userType: "Teacher",
    dateOfBirth: null,
    yearGroup: null,
    personClasses: [],
  },
  {
    userID: "user2",
    firstName: "Paul",
    lastName: "Rich",
    schoolName: "School 2",
    userType: "Pupil",
    dateOfBirth: "2006-01-01",
    yearGroup: 13,
    personClasses: [
      { classID: 1, className: "Class 1" },
      { classID: 2, className: "Class 2" },
    ],
  },
  {
    userID: "user3",
    firstName: "George",
    lastName: "Baker",
    schoolName: "School 1",
    userType: "Teacher",
    dateOfBirth: null,
    yearGroup: null,
    personClasses: [],
  },
];

beforeAll(() => {
  const getQueriesFromUrl = (receivedUrl) => {
    const params = new URL(receivedUrl).searchParams;
    let queriesObj = {};

    for (let [key, value] of params.entries()) {
      queriesObj[key] = value;
    }
    return queriesObj;
  };

  const filterDataByQueries = (receivedData, receivedQueries) => {
    if (Object.keys(receivedQueries).length === 0) {
      return receivedData;
    }

    return receivedData.filter((each) => {
      return Object.entries(receivedQueries).every(([key, value]) => {
        return each[key] === value;
      });
    });
  };

  global.fetch = jest.fn().mockImplementation(async (url) => {
    const queriesFromUrl = getQueriesFromUrl(url);
    const filteredData = filterDataByQueries(data, queriesFromUrl);

    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: filteredData,
        }),
    });
  });
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe("PeopleSearchPage - SearchByMultipleFields", () => {
  test("should display the correct fields and buttons", () => {
    renderComponent();

    const firstName = screen.getByRole("textbox", { name: /first name/i });
    const lastName = screen.getByRole("textbox", { name: /last name/i });
    const schoolsDropdown = screen.getByRole("combobox", { name: /school/i });
    const userTypeDropdown = screen.getByRole("combobox", {
      name: /user type/i,
    });
    const yearGroupDropdown = screen.getByRole("combobox", {
      name: /year group/i,
    });
    const classesDropdown = screen.getByRole("combobox", { name: /class/i });
    const clearFiltersButton = screen.getByRole("button", {
      name: /clear filters/i,
    });
    const submitButton = screen.getByRole("button", { name: /submit button/i });

    [
      firstName,
      lastName,
      schoolsDropdown,
      userTypeDropdown,
      yearGroupDropdown,
      classesDropdown,
      clearFiltersButton,
      submitButton,
    ].forEach((element) => expect(element).toBeInTheDocument());
  });

  test("should display validation messages for firstName and lastName when the user types values", async () => {
    renderComponent();

    const firstName = screen.getByRole("textbox", { name: /first name/i });
    const lastName = screen.getByRole("textbox", { name: /last name/i });

    const submitButton = screen.getByRole("button", { name: /submit button/i });

    await userEvent.click(firstName);
    await userEvent.keyboard("J");

    await userEvent.click(lastName);
    await userEvent.keyboard("    ");

    await userEvent.click(submitButton);

    expect(
      screen.getByText("First name must be at least 3 characters.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please enter only letters. Numbers and white spaces are not allowed"
      )
    ).toBeInTheDocument();
  });

  test("should clear all the filters when clicking on the 'Clear filters' button", async () => {
    renderComponent();

    const firstName = screen.getByRole("textbox", { name: /first name/i });
    await userEvent.click(firstName);
    await userEvent.keyboard("John");

    const lastName = screen.getByRole("textbox", { name: /last name/i });
    await userEvent.click(lastName);
    await userEvent.keyboard("Doe");

    const school = screen.getByRole("combobox", { name: /school/i });
    await userEvent.selectOptions(
      school,
      screen.getByRole("option", { name: "School 2" })
    );

    const userType = screen.getByRole("combobox", { name: /user type/i });
    await userEvent.selectOptions(
      userType,
      screen.getByRole("option", { name: "Teacher" })
    );

    const classField = screen.getByRole("combobox", { name: /class/i });
    await userEvent.selectOptions(
      classField,
      screen.getByRole("option", { name: "Class 1" })
    );

    const clearFiltersButton = screen.getByRole("button", {
      name: /clear filters/i,
    });
    await userEvent.click(clearFiltersButton);

    [firstName, lastName, school, userType, classField].forEach((field) =>
      expect(field).toHaveValue("")
    );
  });
});

describe("PeopleSearchPage - ViewPeopleByQuery", () => {
  test("should display a text when nothing has been searched", () => {
    renderComponent();

    const startSearching = screen.getByText(/start searching/i);
    expect(startSearching).toBeInTheDocument();
  });

  test("should display a table of results when clicking just the search button", async () => {
    renderComponent();

    const submitButton = screen.getByRole("button", { name: /submit button/i });
    await userEvent.click(submitButton);

    const table = await screen.findByRole("table");
    const rows = within(screen.getByTestId("people")).getAllByRole("row");
    const tableCells = screen.getAllByRole("cell");
    const linksToEditPerson = screen.getAllByRole("link", { name: /edit/i });

    expect(table).toBeInTheDocument();
    expect(rows).toHaveLength(3);
    expect(tableCells).toHaveLength(27);
    expect(linksToEditPerson).toHaveLength(3);
    linksToEditPerson.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });

  test("should display an error message if search input is invalid", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(
        "Please enter a valid query. Could not find any data based on what was requested."
      )
    );

    renderComponent();

    await userEvent.click(screen.getByRole("textbox", { name: /first name/i }));
    await userEvent.keyboard("Someone");

    const submitButton = screen.getByRole("button", { name: /submit button/i });
    await userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/Person/UserSearch?firstName=Someone`
    );

    const errorMessage = await screen.findByText(
      /please enter a valid query. /i,
      { exact: false }
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("should display a table of results if search input of one field is valid", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("textbox", { name: /first name/i }));
    await userEvent.keyboard("Anna");

    const submitButton = screen.getByRole("button", { name: /submit button/i });
    await userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/Person/UserSearch?firstName=Anna`
    );

    const table = await screen.findByRole("table");
    const rows = within(screen.getByTestId("people")).getAllByRole("row");

    expect(table).toBeInTheDocument();
    expect(rows).toHaveLength(1);
    expect(table).toContainElement(screen.getByText(/anna/i));
  });

  test("should display a table of results if search inputs of multiple fields are valid", async () => {
    renderComponent();

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /school/i }),
      screen.getByRole("option", { name: "School 1" })
    );

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /user type/i }),
      screen.getByRole("option", { name: "Teacher" })
    );

    const submitButton = screen.getByRole("button", { name: /submit button/i });
    await userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/Person/UserSearch?userType=Teacher&schoolName=School 1`
    );

    const table = await screen.findByRole("table");
    const rows = within(screen.getByTestId("people")).getAllByRole("row");

    expect(table).toBeInTheDocument();
    expect(rows).toHaveLength(2);
    expect(table).toContainElement(screen.getByText(/anna/i));
    expect(table).toContainElement(screen.getByText(/george/i));
  });
});
