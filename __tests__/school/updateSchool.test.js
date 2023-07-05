import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import { putData } from "@/api-utils";
import UpdateSchool from "@/components/school/UpdateSchool";

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
  const school = { schoolID: "school1", schoolName: "School A" };

  render(<UpdateSchool school={school} />);
};

describe("UpdateSchool", () => {
  test("should display a 'Cancel' link, an 'Update' and 'Delete' button", () => {
    renderComponent();

    const cancelLink = screen.getByRole("link", { name: /cancel/i });
    const updateButton = screen.getByRole("button", { name: /update/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(cancelLink).toHaveAttribute("href", "/schoolList");
    expect(updateButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("should display a confirmation message when updating a school", async () => {
    const mockResponse = [
      { schoolID: "school1", schoolName: "School A" },
      { schoolID: "school2", schoolName: "School B" },
      { schoolID: "school3", schoolName: "School C" },
    ];
    putData.mockResolvedValue(mockResponse);

    renderComponent();

    const schoolName = screen.getByRole("textbox");
    await userEvent.click(schoolName);
    await userEvent.keyboard("{backspace}D");

    //confirmation modal should not exist
    const successModal = screen.queryByTestId("success-modal");
    expect(successModal).not.toBeInTheDocument();

    const updateButton = screen.getByRole("button", { name: /update/i });
    await userEvent.click(updateButton);

    //confirmation modal should appear
    const successMessage = screen.getByText(
      /school was successfully updated!/i
    );
    const linkToSchoolList = screen.getByRole("link", {
      name: /go to school list/i,
    });

    expect(screen.getByTestId("success-modal")).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
    expect(linkToSchoolList).toHaveAttribute("href", "/schoolList");
  });
});
