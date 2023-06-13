import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters.")
    .max(20, "First name must be not more than 20 characters.")
    .matches(/^[a-zA-Z]*$/, "Please enter only letters"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters.")
    .max(30, "Last name must be not more than 30 characters.")
    .matches(/^[a-zA-Z]*$/, "Please enter only letters"),

  schoolID: Yup.string().required("Please select a school"),

  userType: Yup.string().required("Please select a user type"),

  dateOfBirth: Yup.date().when("userType", {
    is: (value) => value === "Pupil",
    then: (dateSchema) =>
      dateSchema
        .required("Date is required")
        .min(new Date("2005-01-01"), "Date cannot be before 1/1/2005")
        .max(new Date("2018-12-31"), "Date cannot be after 31/12/2018"),
    otherwise: (dateSchema) => dateSchema.nullable(),
  }),

  yearGroup: Yup.string().when("userType", {
    is: (value) => value === "Pupil",
    then: (yearGroupSchema) =>
      yearGroupSchema.required("Please select a year group"),
    otherwise: (yearGroupSchema) => yearGroupSchema.nullable(),
  }),
});

export default validationSchema;
