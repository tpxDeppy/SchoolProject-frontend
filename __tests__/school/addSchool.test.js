import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { postData } from "@/api-utils";
import AddSchool from "@/components/school/AddSchool";

//mocking api module
jest.mock("../../api-utils");

describe("AddSchool", () => {
  test("should display a 'Cancel' link and an 'Add' button", () => {
    render(<AddSchool />);

    const cancelLink = screen.getByRole("link", { name: /cancel/i });
    const addButton = screen.getByRole("button", { name: /add/i });

    expect(cancelLink).toHaveAttribute("href", "/schoolList");
    expect(addButton).toBeInTheDocument();
  });

  test("should display a confirmation message when adding a school", async () => {
    const mockResponse = [
      { schoolID: "school1", schoolName: "School A" },
      { schoolID: "school2", schoolName: "School B" },
      { schoolID: "school3", schoolName: "School C" },
    ];
    postData.mockResolvedValue(mockResponse);

    render(<AddSchool />);

    const schoolName = screen.getByRole("textbox");
    await userEvent.click(schoolName);
    await userEvent.keyboard("New School");

    //confirmation modal should not exist
    const successModal = screen.queryByTestId("success-modal");
    expect(successModal).not.toBeInTheDocument();

    const addButton = screen.getByRole("button");
    await userEvent.click(addButton);

    //confirmation modal should appear
    const successMessage = screen.getByText(/school was successfully added!/i);
    const buttonToAddMore = screen.getByRole("button", {
      name: /add more/i,
    });
    const linkToNavigateAway = screen.getByRole("link", {
      name: /go to school list/i,
    });

    expect(screen.getByTestId("success-modal")).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
    expect(buttonToAddMore).toBeInTheDocument();
    expect(linkToNavigateAway).toHaveAttribute("href", "/schoolList");

    //click button to add another school
    await userEvent.click(buttonToAddMore);
    expect(successMessage).not.toBeInTheDocument();
  });
});
