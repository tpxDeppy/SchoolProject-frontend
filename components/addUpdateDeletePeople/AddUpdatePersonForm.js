import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";

import { postData, putData } from "@/api-utils";
import DeleteModal from "./DeleteModal";

const userTypeOptions = ["Teacher", "Pupil"];
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

const AddUpdatePersonForm = ({
  title,
  subTitle,
  buttonTitle,
  person,
  schools,
}) => {
  const [firstName, setFirstName] = useState(
    buttonTitle === "Add" ? "" : person?.firstName
  );
  const [lastName, setLastName] = useState(
    buttonTitle === "Add" ? "" : person?.lastName
  );
  const [schoolID, setSchoolID] = useState(
    buttonTitle === "Add" ? "" : person?.schoolID
  );
  const [userType, setUserType] = useState(
    buttonTitle === "Add" ? "" : person?.userType
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    buttonTitle === "Add"
      ? null
      : (person?.dateOfBirth !== null && person?.dateOfBirth.slice(0, 10)) ||
          (person?.dateOfBirth === null && null)
  );
  const [yearGroup, setYearGroup] = useState(
    buttonTitle === "Add"
      ? null
      : person?.yearGroup || (person?.yearGroup === null && null)
  );

  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    schoolID: schoolID,
    userType: userType,
    dateOfBirth: dateOfBirth,
    yearGroup: yearGroup,
  };

  const { push } = useRouter();

  const onSubmit = async (values) => {
    //update person
    if (buttonTitle === "Update") {
      if (values.userType === "Teacher") {
        values.dateOfBirth = null;
        values.yearGroup = null;
      }
      const personID = person?.userID;
      const updatedValues = {
        userID: personID,
        ...values,
      };
      console.log(values);
      await putData(`https://localhost:7166/Person/${personID}`, updatedValues);
      alert("Person was successfully updated");
      push("/");
    } else {
      //add new person
      await postData("https://localhost:7166/Person/AddPerson", values);
      alert("Person was successfully added");
    }

    setFirstName("");
    setLastName("");
    setSchoolID("");
    setUserType("");
    setDateOfBirth("");
    setYearGroup("");
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleSchool = (event) => {
    setSchoolID(event.target.value);
  };

  const handleUserType = (event) => {
    setUserType(event.target.value);
  };

  const handleDoB = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleYearGroup = (event) => {
    setYearGroup(event.target.value);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { values, handleSubmit, handleChange } = formik;
        return (
          <Form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="mx-auto mt-20 mb-20 flex max-w-8xl items-center justify-center"
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
                      placeholder="First Name"
                      onChange={handleFirstName}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      value={firstName}
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
                      onChange={handleLastName}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      value={lastName}
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
                    htmlFor="schoolID"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    School
                  </label>
                  <div className="mt-2">
                    <Field
                      id="schoolID"
                      name="schoolID"
                      as="select"
                      onChange={handleSchool}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={schoolID}
                    >
                      <option value={""}>Please Select</option>
                      {schools.map((school) => (
                        <option value={school.schoolID} key={school.schoolID}>
                          {school.schoolName}
                        </option>
                      ))}
                    </Field>
                    <div>
                      <ErrorMessage
                        name="schoolID"
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
                      onChange={handleUserType}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={userType}
                    >
                      <option value={""}>Please Select</option>
                      {userTypeOptions.map(
                        (userType) =>
                          person?.userType !== null && (
                            <option value={person?.userType}>
                              {person?.userType}
                            </option>
                          ) && (
                            <option value={userType} key={userType}>
                              {userType}
                            </option>
                          )
                      )}
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
                          onChange={handleDoB}
                          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full"
                          value={dateOfBirth || ""}
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
                          onChange={handleYearGroup}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          value={yearGroup || ""}
                        >
                          <option value={""}>Please Select</option>
                          {yearGroups.map(
                            (yearGroup) =>
                              (
                                <option value={person?.yearGroup}>
                                  {person?.yearGroup}
                                </option>
                              ) && (
                                <option value={yearGroup} key={yearGroup}>
                                  {yearGroup}
                                </option>
                              )
                          )}
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
                {buttonTitle === "Update" && <DeleteModal person={person} />}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddUpdatePersonForm;
