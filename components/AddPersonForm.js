import DeleteModal from "./DeleteModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const userTypeOptions = ["Teacher", "Pupil"];
const schools = ["School 1", "School 2", "School 3"];
const yearGroups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

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

  school: Yup.string().required("Please select a school"),

  userType: Yup.string().required("Please select a user type"),

  dateOfBirth: Yup.date().when("userType", {
    is: (value) => value === "Pupil",
    then: (dateSchema) =>
      dateSchema
        .required("Date is required")
        .min(new Date("2005-01-01"), "Date cannot be before 1/1/2005")
        .max(new Date("2018-12-31"), "Date cannot be after 31/12/2018"),
  }),

  yearGroup: Yup.string().when("userType", {
    is: (value) => value === "Pupil",
    then: (yearGroupSchema) =>
      yearGroupSchema.required("Please select a year group"),
  }),
});

const initialValues = {
  firstName: "",
  lastName: "",
  school: "",
  userType: "",
  dateOfBirth: "",
  yearGroup: "",
};

const AddPersonForm = ({ title, subTitle, buttonTitle }) => {
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    if (buttonTitle === "Update") {
      alert("successfully updated");
      resetForm({ values: "" });
    }

    alert("successfully added");
    resetForm({ values: "" });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { values, handleSubmit } = formik;
        return (
          <Form
            onSubmit={handleSubmit}
            className="mx-auto mt-20 flex max-w-8xl items-center justify-center"
          >
            {/* title */}
            <div className="bg-white p-10 border-b border-gray-900/10 pb-12 shadow-lg">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {subTitle}details of the user
              </p>

              {/* fields */}
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <Field
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="First name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="span"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <Field
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Last name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    />
                    <div>
                      <ErrorMessage
                        name="lastName"
                        component="span"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>

                {/*dropdown for school*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="school"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    School
                  </label>
                  <div className="mt-2">
                    <Field
                      id="school"
                      name="school"
                      as="select"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={""}>Please Select</option>
                      {schools.map((school) => (
                        <option value={school} key={school}>
                          {school}
                        </option>
                      ))}
                    </Field>
                    <div>
                      <ErrorMessage
                        name="school"
                        component="span"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>

                {/*dropdown for usertype*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="userType"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    User type
                  </label>
                  <div className="mt-2">
                    <Field
                      id="userType"
                      name="userType"
                      as="select"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={""}>Please Select</option>
                      {userTypeOptions.map((userType) => (
                        <option value={userType} key={userType}>
                          {userType}
                        </option>
                      ))}
                    </Field>
                    <div>
                      <ErrorMessage
                        name="userType"
                        component="span"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>

                {values.userType === "Pupil" && (
                  <>
                    {/* datepicker */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="dateOfBirth"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Date of birth
                      </label>
                      <div className="mt-2">
                        <Field
                          name="dateOfBirth"
                          type="date"
                          id="dateOfBirth"
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full"
                        />
                      </div>
                      <div>
                        <ErrorMessage
                          name="dateOfBirth"
                          component="span"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </div>

                    {/* dropdown for year group */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="yearGroup"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Year group
                      </label>
                      <div className="mt-2">
                        <Field
                          id="yearGroup"
                          name="yearGroup"
                          as="select"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option value={""}>Please Select</option>
                          {yearGroups.map((yearGroup) => (
                            <option value={yearGroup} key={yearGroup}>
                              {yearGroup}
                            </option>
                          ))}
                        </Field>
                        <div>
                          <ErrorMessage
                            name="yearGroup"
                            component="span"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* buttons */}
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link
                  href="/"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {buttonTitle}
                </button>
                {buttonTitle === "Update" && <DeleteModal />}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPersonForm;
