import { useFormik } from "formik";
import Link from "next/link";

import validationSchema from "./personValidation";
import DeletePerson from "../DeletePerson";
import AddUpdateModal from "@/components/ui/AddUpdateModal";

const userTypeOptions = ["Teacher", "Pupil"];
const yearGroups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const AddUpdatePersonForm = ({
  title,
  subTitle,
  buttonTitle,
  person,
  schools,
  classes,
  initialValues,
  onSubmit,
  message,
  setMessage,
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto mt-20 mb-20 flex max-w-8xl items-center justify-center"
    >
      <div className="bg-white p-10 border-b border-gray-900/10 pb-12 shadow-lg">
        {/* title */}
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
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-sm text-red-500">
                  {formik.errors.firstName}
                </div>
              )}
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
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              <div>
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-sm text-red-500">
                    {formik.errors.lastName}
                  </div>
                )}
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
              <select
                id="schoolID"
                name="schoolID"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.schoolID}
              >
                <option value={""}>Please Select</option>
                {schools.map((school) => (
                  <option value={school.schoolID} key={school.schoolID}>
                    {school.schoolName}
                  </option>
                ))}
              </select>
              <div>
                {formik.touched.schoolID && formik.errors.schoolID && (
                  <div className="text-sm text-red-500">
                    {formik.errors.schoolID}
                  </div>
                )}
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
              <select
                id="userType"
                name="userType"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userType}
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
              </select>
              <div>
                {formik.touched.userType && formik.errors.userType && (
                  <div className="text-sm text-red-500">
                    {formik.errors.userType}
                  </div>
                )}
              </div>
            </div>
          </div>

          {formik.values.userType === "Pupil" && (
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
                  <input
                    name="dateOfBirth"
                    type="date"
                    id="dateOfBirth"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateOfBirth || ""}
                  />
                </div>
                <div>
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                    <div className="text-sm text-red-500">
                      {formik.errors.dateOfBirth}
                    </div>
                  )}
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
                  <select
                    id="yearGroup"
                    name="yearGroup"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.yearGroup || ""}
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
                  </select>
                  <div>
                    {formik.touched.yearGroup && formik.errors.yearGroup && (
                      <div className="text-sm text-red-500">
                        {formik.errors.yearGroup}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Classes field */}
          <div className="sm:col-span-3">
            <label
              htmlFor="personClasses"
              className="mb-2 block text-sm font-medium leading-6 text-gray-900"
            >
              Choose classes
            </label>
            <div className="mt-2 p-2 rounded-md border-0 text-cyan-600 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6">
              {classes.map((option) => (
                <label
                  key={option.classID}
                  className="block text-sm text-gray-700"
                >
                  {option.className}
                  <input
                    type="checkbox"
                    name="personClasses"
                    value={option.classID}
                    className="ml-3 rounded-md border-0 text-cyan-600 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    checked={
                      person &&
                      formik.values.personClasses.some(
                        (personClass) => personClass.classID === option.classID
                      )
                    }
                    onChange={
                      person
                        ? (event) => {
                            const { value, checked } = event.target;
                            if (checked) {
                              formik.setFieldValue("personClasses", [
                                ...formik.values.personClasses,
                                { classID: value },
                              ]);
                            } else {
                              formik.setFieldValue(
                                "personClasses",
                                formik.values.personClasses.filter(
                                  (personClass) => personClass.classID !== value
                                )
                              );
                            }
                          }
                        : formik.handleChange
                    }
                    onBlur={formik.handleBlur}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <AddUpdateModal
            buttonTitle={buttonTitle}
            message={message}
            setMessage={setMessage}
            closeButtonTitle={buttonTitle + " " + "more"}
            pageToGo="Homepage"
            linkToPage="/"
          />
          {buttonTitle === "Update" && <DeletePerson person={person} />}
        </div>
      </div>
    </form>
  );
};

export default AddUpdatePersonForm;
