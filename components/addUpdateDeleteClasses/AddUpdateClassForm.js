import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";

import { postData, putData } from "@/api-utils";
import DeleteModal from "../ui/DeleteModal";

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

const AddUpdateClassForm = ({ title, subTitle, buttonTitle, schoolClass }) => {
  const [className, setClassName] = useState(
    buttonTitle === "Add" ? "" : schoolClass?.className
  );

  const [classDescription, setClassDescription] = useState(
    buttonTitle === "Add" ? "" : schoolClass?.classDescription
  );

  const initialValues = {
    className: className,
    classDescription: classDescription,
  };

  const { push } = useRouter();

  const onSubmit = async (values) => {
    //update class
    if (buttonTitle === "Update") {
      const classID = schoolClass?.classID;
      const updatedValues = {
        classID: classID,
        ...values,
      };
      console.log(values);
      await putData(`https://localhost:7166/Class/${classID}`, updatedValues);
      alert("Class was successfully updated");
      push("/classList");
    } else {
      //add new class
      await postData("https://localhost:7166/Class/AddClass", values);
      alert("Class was successfully added");
    }

    setClassName("");
    setClassDescription("");
  };

  const handleClassName = (event) => {
    setClassName(event.target.value);
  };

  const handleClassDescription = (event) => {
    setClassDescription(event.target.value);
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
                {subTitle}class
              </p>

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
                    <Field
                      type="text"
                      name="className"
                      id="className"
                      placeholder="Class Name"
                      onChange={handleClassName}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      value={className}
                    />
                    <ErrorMessage
                      name="className"
                      component="span"
                      className="text-sm text-red-500"
                    />
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
                    <Field
                      as="textarea"
                      type="text"
                      name="classDescription"
                      id="classDescription"
                      placeholder="Class Description"
                      onChange={handleClassDescription}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      value={classDescription}
                    />
                    <ErrorMessage
                      name="classDescription"
                      component="span"
                      className="text-sm text-red-500"
                    />
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
                <button
                  type="submit"
                  className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {buttonTitle}
                </button>
                {buttonTitle === "Update" && (
                  <DeleteModal modalTitle="class" toBeDeleted={schoolClass} />
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddUpdateClassForm;
