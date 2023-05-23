import { useContext } from "react";
import { SearchPeopleContext } from "@/pages/searchPeople/searchPeopleContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getData } from "@/api-utils";

const validationSchema = Yup.object().shape({
  filterOption: Yup.string().required("Please select a filter option"),

  searchInput: Yup.string()
    .required("Type something to start searching...")
    .min(3, "Please enter an input that's at least 3 characters long")
    .max(20, "Input cannot exceed the 20 characters")
    .matches(
      /\b\s*(?![\d\s])\w+\b/,
      "Please enter only letters. Numbers and white spaces are not allowed"
    ),
});

const filterOnOptions = ["See all", "LastName", "UserType", "SchoolName"];

const initialValues = { filterOption: "", searchInput: "" };

const SearchForm = () => {
  const {
    updateSearchQuery,
    updateSearchResults,
    updateError,
    updateErrorMessage,
  } = useContext(SearchPeopleContext);

  const fetchFilteredData = async (url, option = null, query = null) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        const resultData = responseData.data;
        console.log(resultData);
        updateError(false);
        updateSearchQuery(query);
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
    const { filterOption, searchInput } = values;
    const searchQuery = searchInput.trim();

    const url = `https://localhost:7166/Person/GetAll?filterOn=${filterOption}&filterQuery=${searchQuery}`;

    fetchFilteredData(url, filterOption, searchQuery);
  };

  const handleSearch = (event) => {
    const searchChange = event.target.value;
    updateSearchQuery(searchChange);
  };

  const handleSeeAllFilter = async (event) => {
    const url = "https://localhost:7166/Person/GetAll";

    const selectedOption = event.target.value;
    if (selectedOption === "See all") {
      const allPeople = await getData(url);
      updateSearchQuery("See all");
      updateSearchResults(allPeople);
    }
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
          <div className="max-w-2xl mx-auto mb-15">
            <Form
              onSubmit={handleSubmit}
              onChange={handleChange}
              className="grid grid-rows-1 grid-flow-col grid-cols-2 gap-1"
            >
              <label htmlFor="simple-search" className="sr-only">
                Search people
              </label>
              <div className="flex flex-col pr-2.5">
                <Field
                  id="filterOption"
                  name="filterOption"
                  as="select"
                  onChange={handleSeeAllFilter}
                  className="rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value={""}>Filter On</option>
                  {filterOnOptions.map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="filterOption"
                  component="span"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <Field
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    onChange={handleSearch}
                    placeholder="Search a person..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5"
                  />
                  <ErrorMessage
                    name="searchInput"
                    component="span"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-cyan-700 rounded-lg hover:bg-cyan-500 focus:ring-4 focus:outline-none focus:ring-cyan-300 "
              >
                <svg
                  className="w-5 h-5"
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
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default SearchForm;
