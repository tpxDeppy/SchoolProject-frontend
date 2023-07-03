import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import { deleteData } from "@/api-utils";
import DeleteSchool from "@/components/school/DeleteSchool";

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
  const school = { schoolID: "school1", schoolName: "School A" };

  render(<DeleteSchool school={school} />);
};

describe("DeleteSchool", () => {
  test("should display a modal when clicking on 'Delete' button", async () => {
    renderComponent();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    const deleteModal = screen.getByRole("dialog");
    expect(deleteModal).toBeInTheDocument();
    expect(screen.getByText(/delete school/i)).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure/i, { exact: false })
    ).toBeInTheDocument();

    const deleteButtonInModal = screen.getByRole("button", { name: /delete/i });
    const cancelButtonInModal = screen.getByRole("button", { name: /cancel/i });
    expect(deleteButtonInModal).toBeInTheDocument();
    expect(cancelButtonInModal).toBeInTheDocument();

    await userEvent.click(cancelButtonInModal);

    expect(screen.queryByText(/delete school/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/are you sure/i, { exact: false })
    ).not.toBeInTheDocument();
  });

  test("should delete the school and redirect to School List", async () => {
    const mockResponse = [
      { schoolID: "school2", schoolName: "School B" },
      { schoolID: "school3", schoolName: "School C" },
    ];
    deleteData.mockResolvedValue(mockResponse);

    delete window.location;
    window.location = {
      pathname: "/schoolList",
    };

    renderComponent();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    const deleteButtonInModal = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButtonInModal);

    expect(window.location.pathname).toBe("/schoolList");
  });
});
