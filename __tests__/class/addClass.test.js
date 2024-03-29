import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { postData } from "@/api-utils";
import AddClass from "@/components/class/AddClass";

//mocking api module
jest.mock("../../api-utils");

describe("AddClass", () => {
  test("should display a 'Cancel' link and an 'Add' button", () => {
    render(<AddClass />);

    const cancelLink = screen.getByRole("link", { name: /cancel/i });
    const addButton = screen.getByRole("button", { name: /add/i });

    expect(cancelLink).toHaveAttribute("href", "/classList");
    expect(addButton).toBeInTheDocument();
  });

  test("should display a confirmation message when adding a class", async () => {
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
    postData.mockResolvedValue(mockResponse);

    render(<AddClass />);

    const className = screen.getByRole("textbox", { name: /class name/i });
    await userEvent.click(className);
    await userEvent.keyboard("New Class");

    const classDescription = screen.getByRole("textbox", {
      name: /class description/i,
    });
    await userEvent.click(classDescription);
    await userEvent.keyboard("New Class Description");

    //confirmation modal should not exist
    const successModal = screen.queryByTestId("success-modal");
    expect(successModal).not.toBeInTheDocument();

    const addButton = screen.getByRole("button");
    await userEvent.click(addButton);

    //confirmation modal should appear
    const successMessage = screen.getByText(/class was successfully added!/i);
    const buttonToAddMore = screen.getByRole("button", {
      name: /add more/i,
    });
    const linkToNavigateAway = screen.getByRole("link", {
      name: /go to class list/i,
    });

    expect(screen.getByTestId("success-modal")).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
    expect(buttonToAddMore).toBeInTheDocument();
    expect(linkToNavigateAway).toHaveAttribute("href", "/classList");

    //click button to add another class
    await userEvent.click(buttonToAddMore);
    expect(successMessage).not.toBeInTheDocument();
  });
});
