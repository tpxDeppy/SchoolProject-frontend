import { useFormik } from "formik";
import Link from "next/link";

import validationSchema from "./schoolValidation";
import DeleteSchool from "../DeleteSchool";

const AddUpdateSchoolForm = ({
  title,
  subTitle,
  buttonTitle,
  school,
  initialValues,
  onSubmit,
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
      {/* title */}
      <div className="bg-white p-10 border-b border-gray-900/10 pb-12 shadow-lg">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">{subTitle}school</p>

        {/* field */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="schoolName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              School name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="schoolName"
                id="schoolName"
                placeholder="School Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.schoolName}
              />
              {formik.touched.schoolName && formik.errors.schoolName && (
                <div className="text-sm text-red-500">
                  {formik.errors.schoolName}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-10 flex items-center justify-end gap-x-6">
          <Link
            href="/schoolList"
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
          {buttonTitle === "Update" && <DeleteSchool school={school} />}
        </div>
      </div>
    </form>
  );
};

export default AddUpdateSchoolForm;
