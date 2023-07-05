import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import { putData } from "@/api-utils";
import UpdateClass from "@/components/class/UpdateClass";

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
  const schoolClass = {
    classID: "class1",
    className: "Class A",
    classDescription: "This is Class A",
  };

  render(<UpdateClass schoolClass={schoolClass} />);
};

describe("UpdateClass", () => {
  test("should display a 'Cancel' link, an 'Update' and 'Delete' button", () => {
    renderComponent();

    const cancelLink = screen.getByRole("link", { name: /cancel/i });
    const updateButton = screen.getByRole("button", { name: /update/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(cancelLink).toHaveAttribute("href", "/classList");
    expect(updateButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("should display a confirmation message when updating a class", async () => {
    const mockResponse = [
      {
        classID: "class1",
        className: "Class A",
        classDescription: "This is Class A",
      },
      {
        classID: "class2",
        className: "Class B",
        classDescription: "This is Class B",
      },
    ];
    putData.mockResolvedValue(mockResponse);

    renderComponent();

    const className = screen.getByRole("textbox", { name: /class name/i });
    await userEvent.click(className);
    await userEvent.keyboard("{backspace}F");

    const classDescription = screen.getByRole("textbox", {
      name: /class description/i,
    });
    await userEvent.click(classDescription);
    await userEvent.keyboard("{backspace}F");

    //confirmation modal should not exist
    const successModal = screen.queryByTestId("success-modal");
    expect(successModal).not.toBeInTheDocument();

    const updateButton = screen.getByRole("button", { name: /update/i });
    await userEvent.click(updateButton);

    //confirmation modal should appear
    const successMessage = screen.getByText(/class was successfully updated!/i);
    const linkToClassList = screen.getByRole("link", {
      name: /go to class list/i,
    });

    expect(screen.getByTestId("success-modal")).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
    expect(linkToClassList).toHaveAttribute("href", "/classList");
  });
});
