import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AddUpdatePersonForm from "../../components/person/personForm/AddUpdatePersonForm";

const renderComponent = (initialValues) => {
  const schools = [
    { schoolID: 1, schoolName: "School 1" },
    { schoolID: 2, schoolName: "School 2" },
  ];

  const classes = [
    { classID: 1, className: "Class 1" },
    { classID: 2, className: "Class 2" },
  ];

  render(
    <AddUpdatePersonForm
      initialValues={initialValues}
      schools={schools}
      classes={classes}
    />
  );
};

describe("AddUpdatePersonForm", () => {
  test("displays validation errors for invalid form fields", async () => {
    const initialValues = {
      firstName: "",
      lastName: "",
      schoolID: "",
      userType: "",
      dateOfBirth: "",
      yearGroup: "",
      personClasses: [],
    };

    renderComponent(initialValues);

    const submitButton = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Please select a school")).toBeInTheDocument();
    expect(screen.getByText("Please select a user type")).toBeInTheDocument();
    if (screen.getByLabelText("User type") === "Pupil") {
      expect(screen.getByText("Date is required")).toBeInTheDocument();
      expect(
        screen.getByText("Please select a year group")
      ).toBeInTheDocument();
    }
  });

  test("displays validation errors for invalid user-entered values", async () => {
    const initialValues = {
      firstName: "",
      lastName: "",
      schoolID: "",
      userType: "",
      dateOfBirth: "",
      yearGroup: "",
      personClasses: [],
    };

    renderComponent(initialValues);

    //Find the relevant field and simulate typing/selecting an input
    const firstName = screen.getByRole("textbox", { name: /first name/i });
    await userEvent.click(firstName);
    await userEvent.keyboard("An");

    const lastName = screen.getByRole("textbox", { name: /last name/i });
    await userEvent.click(lastName);
    await userEvent.keyboard("123$!");

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /user type/i }),
      screen.getByRole("option", { name: "Pupil" })
    );

    const dateOfBirth = screen.getByLabelText(/date of birth/i);
    await userEvent.click(dateOfBirth);
    await userEvent.keyboard("2023-06-16");

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(
      screen.getByText("First name must be at least 3 characters.")
    ).toBeInTheDocument();
    expect(screen.getByText("Please enter only letters")).toBeInTheDocument();
    expect(screen.getByText("Please select a school")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Pupil" }).selected).toBe(true);
    expect(
      screen.getByText("Date cannot be after 31/12/2018")
    ).toBeInTheDocument();
    expect(screen.getByText("Please select a year group")).toBeInTheDocument();
  });

  test("displays validation errors for invalid user-modified values when updating a person", async () => {
    const initialValues = {
      firstName: "John",
      lastName: "Doe",
      schoolID: "School 1",
      userType: "Teacher",
      dateOfBirth: null,
      yearGroup: null,
      personClasses: [{ classID: 1, className: "Class 1" }],
    };

    renderComponent(initialValues);

    //Find the relevant field and simulate typing/selecting an input
    const firstName = screen.getByRole("textbox", { name: /first name/i });
    await userEvent.click(firstName);
    await userEvent.keyboard("Johnjohnjohnjohnjohnj");

    const lastName = screen.getByRole("textbox", { name: /last name/i });
    await userEvent.click(lastName);
    await userEvent.keyboard("{backspace}{backspace}");

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /school/i }),
      //keeping the initial value
      screen.getByRole("option", { name: "School 1" })
    );

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: /user type/i }),
      //changing the value to 'Pupil'
      screen.getByRole("option", { name: "Pupil" })
    );

    const selectedClass = screen.getByRole("checkbox", {
      name: /class 1/i,
    });

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    expect(
      screen.getByText("First name must be not more than 20 characters.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Last name must be at least 3 characters.")
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "School 1" }).selected).toBe(
      true
    );
    expect(screen.getByRole("option", { name: "Pupil" }).selected).toBe(true);
    expect(screen.getByText("Date is required")).toBeInTheDocument();
    expect(screen.getByText("Please select a year group")).toBeInTheDocument();
    expect(selectedClass).toBeInTheDocument();
  });
});
