import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  className: Yup.string()
    .required("Class name is required")
    .min(3, "Class name must be at least 3 characters.")
    .max(10, "Class name must be not more than 10 characters."),

  classDescription: Yup.string()
    .required("Class description is required")
    .min(3, "Class description must be at least 2 characters.")
    .max(100, "Class description must be not more than 100 characters."),
});

export default validationSchema;
