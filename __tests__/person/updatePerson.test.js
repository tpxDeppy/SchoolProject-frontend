import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import { putData } from "@/api-utils";
import UpdatePerson from "@/components/person/UpdatePerson";

//mocking useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();
useRouter.mockReturnValue({
  push: pushMock,
});

//mocking api module
jest.mock("../../api-utils");

const renderComponent = () => {
  const person = {
    userID: "user4",
    firstName: "John",
    lastName: "Doe",
    schoolID: "School 1",
    userType: "Teacher",
    dateOfBirth: null,
    yearGroup: null,
    personClasses: [{ classID: 1, className: "Class 1" }],
  };

  const schools = [
    { schoolID: 1, schoolName: "School 1" },
    { schoolID: 2, schoolName: "School 2" },
  ];

  const classes = [
    { classID: 1, className: "Class 1" },
    { classID: 2, className: "Class 2" },
  ];

  render(<UpdatePerson person={person} schools={schools} classes={classes} />);
};

describe("UpdatePerson", () => {
  test("should display a 'Cancel' link, an 'Update' and 'Delete' button", () => {
    renderComponent();

    const cancelLink = screen.getByRole("link", { name: /cancel/i });
    const updateButton = screen.getByRole("button", { name: /update/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(cancelLink).toHaveAttribute("href", "/");
    expect(updateButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("should display a confirmation message when updating a person", async () => {
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
    putData.mockResolvedValue(mockResponse);

    renderComponent();

    const firstName = screen.getByRole("textbox", { name: /first name/i });
    await userEvent.click(firstName);
    await userEvent.keyboard("{backspace}{backspace}n");

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /user type/i }),
      screen.getByRole("option", { name: "Teacher" })
    );

    const class2 = screen.getByRole("checkbox", {
      name: /class 2/i,
    });
    await userEvent.click(class2);

    const updateButton = screen.getByRole("button", { name: /update/i });
    await userEvent.click(updateButton);

    //confirmation message should appear
    const successMessage = await screen.findByText(
      /person was successfully updated!/i
    );
    expect(successMessage).toBeInTheDocument();
  });
});
