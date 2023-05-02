import DeleteModal from "./DeleteModal";

const AddPeopleForm = ({ title, subTitle, buttonTitle }) => {
  const schools = ["School 1", "School 2", "School 3"];
  const yearGroups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <form className="mx-auto mt-20 flex max-w-8xl items-center justify-center">
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
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
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
                autoComplete="userType-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Please Select</option>
                <option>Teacher</option>
                <option>Pupil</option>
              </select>
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
              <select
                id="school"
                name="school"
                autoComplete="school-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Please Select</option>
                {schools.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

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
                type="date"
                id="dateOfBirth"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full"
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
              <select
                id="yearGroup"
                name="yearGroup"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Please Select</option>
                {yearGroups.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {buttonTitle}
          </button>
          {buttonTitle === "Update" && <DeleteModal />}
        </div>
      </div>
    </form>
  );
};

export default AddPeopleForm;
