import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { postData } from "@/api-utils";
import AddPerson from "@/components/person/AddPerson";

//mocking api module
jest.mock("../../api-utils");

const renderComponent = () => {
  const schools = [
    { schoolID: 1, schoolName: "School 1" },
    { schoolID: 2, schoolName: "School 2" },
  ];

  const classes = [
    { classID: 1, className: "Class 1" },
    { classID: 2, className: "Class 2" },
  ];

  render(<AddPerson schools={schools} classes={classes} />);
};

describe("AddPerson", () => {
  test("should display a 'Cancel' link and an 'Add' button when no initial values", () => {
    renderComponent();

    const cancelLink = screen.getByRole("link", { name: /cancel/i });
    const addButton = screen.getByRole("button", { name: /add/i });

    expect(cancelLink).toHaveAttribute("href", "/");
    expect(addButton).toBeInTheDocument();
  });

  test("should display a confirmation message when adding a person", async () => {
    const mockResponse = {
      data: [
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
        {
          userID: "user3",
          firstName: "George",
          lastName: "Baker",
          schoolID: "School 1",
          userType: "Teacher",
          dateOfBirth: null,
          yearGroup: null,
          personClasses: [],
        },
      ],
    };

    postData.mockResolvedValue(mockResponse);

    renderComponent();

    const firstName = screen.getByRole("textbox", { name: /first name/i });
    await userEvent.click(firstName);
    await userEvent.keyboard("Tom");

    const lastName = screen.getByRole("textbox", { name: /last name/i });
    await userEvent.click(lastName);
    await userEvent.keyboard("Louis");

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /school/i }),
      screen.getByRole("option", { name: "School 1" })
    );

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /user type/i }),
      screen.getByRole("option", { name: "Teacher" })
    );

    const class2 = screen.getByRole("checkbox", {
      name: /class 2/i,
    });
    await userEvent.click(class2);

    //confirmation modal should not exist
    const successModal = screen.queryByTestId("success-modal");
    expect(successModal).not.toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: /add/i });
    await userEvent.click(addButton);

    //confirmation modal should appear
    const successMessage = screen.getByText(/person was successfully added!/i);
    const buttonToAddMore = screen.getByRole("button", {
      name: /add more/i,
    });
    const linkToNavigateAway = screen.getByRole("link", {
      name: /go to homepage/i,
    });

    expect(screen.getByTestId("success-modal")).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
    expect(buttonToAddMore).toBeInTheDocument();
    expect(linkToNavigateAway).toHaveAttribute("href", "/");

    //add another person
    await userEvent.click(buttonToAddMore);

    await userEvent.click(firstName);
    await userEvent.keyboard("Mark");

    await userEvent.click(lastName);
    await userEvent.keyboard("Well");

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /school/i }),
      screen.getByRole("option", { name: "School 2" })
    );

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /user type/i }),
      screen.getByRole("option", { name: "Teacher" })
    );

    await userEvent.click(addButton);
    expect(
      screen.getByText(/person was successfully added!/i)
    ).toBeInTheDocument();

    await userEvent.click(linkToNavigateAway);
    expect(successModal).not.toBeInTheDocument();
    expect(successMessage).not.toBeInTheDocument();
  });
});
