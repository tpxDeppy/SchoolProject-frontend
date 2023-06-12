import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  schoolName: Yup.string()
    .required("School name is required")
    .min(2, "School name must be at least 2 characters.")
    .max(10, "School name must be not more than 10 characters."),
});

export default validationSchema;
