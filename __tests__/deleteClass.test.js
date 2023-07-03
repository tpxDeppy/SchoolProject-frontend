import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import { deleteData } from "@/api-utils";
import DeleteClass from "@/components/class/DeleteClass";

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
  const schoolClass = {
    classID: "class1",
    className: "Class A",
    classDescription: "This is Class A",
  };

  render(<DeleteClass schoolClass={schoolClass} />);
};

describe("DeleteClass", () => {
  test("should display a modal when clicking on 'Delete' button", async () => {
    renderComponent();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    const deleteModal = screen.getByRole("dialog");
    expect(deleteModal).toBeInTheDocument();
    expect(screen.getByText(/delete class/i)).toBeInTheDocument();
    expect(
      screen.getByText(/are you sure/i, { exact: false })
    ).toBeInTheDocument();

    const deleteButtonInModal = screen.getByRole("button", { name: /delete/i });
    const cancelButtonInModal = screen.getByRole("button", { name: /cancel/i });
    expect(deleteButtonInModal).toBeInTheDocument();
    expect(cancelButtonInModal).toBeInTheDocument();

    await userEvent.click(cancelButtonInModal);

    expect(screen.queryByText(/delete class/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/are you sure/i, { exact: false })
    ).not.toBeInTheDocument();
  });

  test("should delete the class and redirect to Class List", async () => {
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
    deleteData.mockResolvedValue(mockResponse);

    delete window.location;
    window.location = {
      pathname: "/classList",
    };

    renderComponent();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButton);

    const deleteButtonInModal = screen.getByRole("button", { name: /delete/i });
    await userEvent.click(deleteButtonInModal);

    expect(window.location.pathname).toBe("/classList");
  });
});
