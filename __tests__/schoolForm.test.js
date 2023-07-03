import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddUpdateSchoolForm from "@/components/school/schoolForm/AddUpdateSchoolForm";

const renderComponent = (initialValues) => {
  render(<AddUpdateSchoolForm initialValues={initialValues} />);
};

describe("AddUpdateSchoolForm", () => {
  test("displays validation error for invalid form field", async () => {
    const initialValues = {
      schoolName: "",
    };

    renderComponent(initialValues);

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(screen.getByText("School name is required")).toBeInTheDocument();
  });

  test("displays validation error for when the user types one character", async () => {
    const initialValues = {
      schoolName: "",
    };

    renderComponent(initialValues);

    const schoolName = screen.getByRole("textbox");
    await userEvent.click(schoolName);
    await userEvent.keyboard("S");

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(
      screen.getByText("School name must be at least 2 characters.")
    ).toBeInTheDocument();
  });

  test("displays validation error for when the user types more than ten characters", async () => {
    const initialValues = {
      schoolName: "",
    };

    renderComponent(initialValues);

    const schoolName = screen.getByRole("textbox");
    await userEvent.click(schoolName);
    await userEvent.keyboard("School Name");

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(
      screen.getByText("School name must be not more than 10 characters.")
    ).toBeInTheDocument();
  });

  test("displays validation error for invalid user-modified value when updating a school", async () => {
    const initialValues = {
      schoolName: "School 1",
    };

    renderComponent(initialValues);

    const schoolName = screen.getByRole("textbox");
    await userEvent.click(schoolName);
    await userEvent.keyboard("{backspace}Test");

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(
      screen.getByText("School name must be not more than 10 characters.")
    ).toBeInTheDocument();
  });
});
