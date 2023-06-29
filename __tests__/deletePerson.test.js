import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import { deleteData } from "@/api-utils";
import DeletePerson from "@/components/person/DeletePerson";

//mocking useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();
useRouter.mockReturnValue({
  push: pushMock,
});

//mocking ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

//mocking api module
jest.mock("../api-utils");

const renderComponent = () => {
  const person = {
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
  };

  render(<DeletePerson person={person} />);
};

describe("DeletePerson", () => {
  test("should display a modal when clicking on 'Delete' button", async () => {
    renderComponent();

    //show modal
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    await userEvent.click(deleteButton);

    const deleteModal = screen.getByRole("dialog");
    expect(deleteModal).toBeInTheDocument();
    expect(screen.getByText(/delete person/i)).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure/i, { exact: false })
    ).toBeInTheDocument();

    const deleteButtonInModal = screen.getByRole("button", { name: /delete/i });
    const cancelButtonInModal = screen.getByRole("button", { name: /cancel/i });
    expect(deleteButtonInModal).toBeInTheDocument();
    expect(cancelButtonInModal).toBeInTheDocument();

    //close the modal by pressing Cancel button in modal
    await userEvent.click(cancelButtonInModal);

    expect(screen.queryByText(/delete person/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/are you sure/i, { exact: false })
    ).not.toBeInTheDocument();
  });

  test("should delete the person and redirect to homepage", async () => {
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
    deleteData.mockResolvedValue(mockResponse);

    delete window.location;
    window.location = {
      pathname: "/",
    };

    renderComponent();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    const deleteButtonInModal = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButtonInModal);

    expect(window.location.pathname).toBe("/");
  });
});
