import { useFormik } from "formik";
import Link from "next/link";

import validationSchema from "./classValidation";
import DeleteClass from "../DeleteClass";
import AddUpdateModal from "@/components/ui/AddUpdateModal";

const AddUpdateClassForm = ({
  title,
  subTitle,
  buttonTitle,
  initialValues,
  schoolClass,
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
        <p className="mt-1 text-sm leading-6 text-gray-600">{subTitle}class</p>

        {/* class name field */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="className"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Class name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="className"
                id="className"
                placeholder="Class Name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.className}
              />
              {formik.touched.className && formik.errors.className && (
                <div className="text-sm text-red-500">
                  {formik.errors.className}
                </div>
              )}
            </div>
          </div>

          {/* class description field */}
          <div className="sm:col-span-3">
            <label
              htmlFor="classDescription"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Class Description
            </label>
            <div className="mt-2">
              <textarea
                name="classDescription"
                id="classDescription"
                placeholder="Class Description"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.classDescription}
              />
              {formik.touched.classDescription &&
                formik.errors.classDescription && (
                  <div className="text-sm text-red-500">
                    {formik.errors.classDescription}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-10 flex items-center justify-end gap-x-6">
          <Link
            href="/classList"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <AddUpdateModal
            buttonTitle={buttonTitle}
            message={message}
            setMessage={setMessage}
            closeButtonTitle={buttonTitle + " " + "more"}
            pageToGo="Class List"
            linkToPage="/classList"
          />
          {buttonTitle === "Update" && (
            <DeleteClass schoolClass={schoolClass} />
          )}
        </div>
      </div>
    </form>
  );
};

export default AddUpdateClassForm;
