import { useContext, useEffect } from "react";
import { SearchPeopleContext } from "@/pages/searchPeople/searchPeopleContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const userTypeOptions = ["Teacher", "Pupil"];
const yearGroups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First name must be at least 3 characters.")
    .max(20, "First name must be not more than 20 characters.")
    .matches(
      /\b\s*(?![\d\s])\w+\b/,
      "Please enter only letters. Numbers and white spaces are not allowed"
    ),

  lastName: Yup.string()
    .min(3, "Last name must be at least 3 characters.")
    .max(30, "Last name must be not more than 30 characters.")
    .matches(
      /\b\s*(?![\d\s])\w+\b/,
      "Please enter only letters. Numbers and white spaces are not allowed"
    ),
});

const SearchByMultipleFields = ({ schools }) => {
  const {
    updateSearchQuery,
    updateSearchResults,
    updateError,
    updateErrorMessage,
  } = useContext(SearchPeopleContext);

  const initialValues = {
    firstName: "",
    lastName: "",
    userType: "",
    schoolName: "",
    yearGroup: "",
  };

  //Ensuring that fields are empty and no (previous searched) results show when component mounts
  useEffect(() => {
    updateSearchQuery(initialValues);
    updateSearchResults([]);
  }, []);

  const fetchFilteredData = async (url, queries) => {
    try {
      const response = await fetch(url + queries);
      console.log(url + queries);
      if (response.ok) {
        const responseData = await response.json();
        const resultData = responseData.data;
        console.log(resultData);
        updateError(false);
        updateSearchQuery(queries);
        updateSearchResults(resultData);
      } else {
        const errorMessage = await response.text();
        console.log(errorMessage);
        updateError(true);
        updateErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error(error);
      updateError(true);
      updateErrorMessage(error);
    }
  };

  const onSubmit = async (values) => {
    console.log(values);

    let params = "";
    const url = "https://localhost:7166/Person/UserSearch";

    //This enables showing all people when no values entered
    if (values === initialValues) {
      params = "/";
    }

    //Preparing params
    let firstParam = true;
    Object.keys(values).forEach((key) => {
      if (values[key].trim() !== "") {
        if (firstParam) {
          params += `?${key}=${values[key]}`;
          firstParam = false;
        }
        params += `&${key}=${values[key]}`;
      }
    });

    fetchFilteredData(url, params);
  };

  //Clearing fields and table
  const handleReset = () => {
    updateSearchQuery("");
    updateSearchResults([]);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { handleSubmit, handleChange } = formik;
        return (
          <div className="max-w-3xl mx-auto mb-15">
            <div className="center">
              <p className="font-semibold text-lg pb-2">
                Search people or just click the button to see all the people in
                the system
              </p>
            </div>
            <Form onSubmit={handleSubmit} onChange={handleChange}>
              <div className="mt-8 grid grid-rows-1 sm:grid-cols-5 gap-4">
                {/*first name field*/}
                <div>
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="span"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                {/*last name field*/}
                <div>
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
                <div>
                  <label
                    htmlFor="schoolName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    School
                  </label>
                  <div className="mt-2">
                    <Field
                      id="schoolName"
                      name="schoolName"
                      as="select"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={""}>Please Select</option>
                      {schools.map((school) => (
                        <option value={school.schoolName} key={school.schoolID}>
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
                <div>
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

                {/*dropdown for yearGroup*/}
                <div>
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

                {/* Clear filters button */}
                <button
                  type="reset"
                  onClick={handleReset}
                  className="p-2.5 col-end-5 text-sm font-medium text-white bg-cyan-700 rounded-lg hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 "
                >
                  Clear filters
                </button>

                {/* Submit button */}
                <button
                  type="submit"
                  className="p-2.5 col-end-6 text-sm font-medium text-white bg-cyan-700 rounded-lg hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 "
                >
                  <svg
                    className="w-5 h-5 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default SearchByMultipleFields;
