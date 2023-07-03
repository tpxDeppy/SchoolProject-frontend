import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddUpdateClassForm from "@/components/class/classForm/AddUpdateClassForm";

const renderComponent = (initialValues) => {
  render(<AddUpdateClassForm initialValues={initialValues} />);
};

describe("AddUpdateClassForm", () => {
  test("displays validation errors for invalid forms field", async () => {
    const initialValues = {
      className: "",
      classDescription: "",
    };

    renderComponent(initialValues);

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(screen.getByText("Class name is required")).toBeInTheDocument();
    expect(
      screen.getByText("Class description is required")
    ).toBeInTheDocument();
  });

  test("displays validation errors for when the user types invalid values", async () => {
    const initialValues = {
      className: "",
      classDescription: "",
    };

    renderComponent(initialValues);

    const className = screen.getByRole("textbox", { name: /class name/i });
    await userEvent.click(className);
    await userEvent.keyboard("NewClassNewClass");

    const classDescription = screen.getByRole("textbox", {
      name: /class description/i,
    });
    await userEvent.click(classDescription);
    await userEvent.keyboard("A");

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(
      screen.getByText("Class name must be not more than 10 characters.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Class description must be at least 3 characters.")
    ).toBeInTheDocument();
  });

  test("displays validation error for invalid user-modified value when updating a class", async () => {
    const initialValues = {
      className: "Class 1",
      classDescription: "This is a class called 'Class 1'.",
    };

    renderComponent(initialValues);

    const className = screen.getByRole("textbox", { name: /class name/i });
    await userEvent.click(className);
    await userEvent.keyboard("{backspace}Change");

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(
      screen.getByText("Class name must be not more than 10 characters.")
    ).toBeInTheDocument();
  });
});
