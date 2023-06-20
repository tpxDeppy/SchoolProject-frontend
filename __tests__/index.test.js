import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "@/pages";

//mocking the Link functionality
jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({ children, href }) => <a href={href}>{children}</a>,
  };
});

const renderComponent = (peopleArray) => {
  let people = peopleArray;
  const schools = [
    { schoolID: 1, schoolName: "School 1" },
    { schoolID: 2, schoolName: "School 2" },
  ];
  render(<HomePage people={people} schools={schools} />);
};

describe("Homepage", () => {
  test("should display contents of EmptyContent component if there is no data", () => {
    let people = [];
    renderComponent(people);

    //display always
    const welcomeTitle = screen.getByText(/welcome/i);
    const welcomeSubtitle = screen.getByText(/below you can/i);

    //display if there is no data
    const emptyContentText = screen.getByText(/can't see anything/i);
    const startAddingLink = screen.getByRole("link", {
      name: /start adding people/i,
    });

    expect(startAddingLink).toBeInTheDocument();
    expect(welcomeTitle).toBeInTheDocument();
    expect(welcomeSubtitle).toBeInTheDocument();
    expect(emptyContentText).toBeInTheDocument();
  });

  test("should display a table of people", () => {
    let people = [
      {
        userID: "user1",
        firstName: "Anna",
        lastName: "Prime",
        schoolID: "School 1",
        userType: "Teacher",
        dateOfBirth: null,
        yearGroup: null,
        personClasses: [],
      },
      {
        userID: "user2",
        firstName: "Paul",
        lastName: "Rich",
        schoolID: "School 2",
        userType: "Pupil",
        dateOfBirth: "2006-01-01",
        yearGroup: 13,
        personClasses: [
          { classID: 1, className: "Class 1" },
          { classID: 2, className: "Class 2" },
        ],
      },
    ];
    renderComponent(people);

    const table = screen.getByRole("table");
    //without the data-testid, we get 3 rows including 'thead'
    const rows = within(screen.getByTestId("people")).getAllByRole("row");
    const tableCells = screen.getAllByRole("cell");
    const linksToEditPerson = screen.getAllByRole("link", { name: /edit/i });

    expect(table).toBeInTheDocument();
    expect(rows).toHaveLength(2);
    expect(tableCells).toHaveLength(18);
    expect(linksToEditPerson).toHaveLength(2);
    linksToEditPerson.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
    expect(linksToEditPerson[0]).toHaveAttribute(
      "href",
      `/[${people[0].userID}]`
    );
    expect(linksToEditPerson[1]).toHaveAttribute(
      "href",
      `/[${people[1].userID}]`
    );
  });
});
