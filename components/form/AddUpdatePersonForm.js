import React from "react";
import { useFormik } from "formik";
import validationSchema from "./personValidation";

const AddUpdatePersonForm = (props) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      schoolID: "",
      userType: "",
      dateOfBirth: null,
      yearGroup: null,
    },
    validationSchema: validationSchema,
    onSubmit: props.onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div>{formik.errors.firstName}</div>
        )}
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div>{formik.errors.lastName}</div>
        )}
      </div>

      <div>
        <label htmlFor="schoolID">School ID</label>
        <input
          id="schoolID"
          name="schoolID"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.schoolID}
        />
        {formik.touched.schoolID && formik.errors.schoolID && (
          <div>{formik.errors.schoolID}</div>
        )}
      </div>

      <div>
        <label htmlFor="userType">User Type</label>
        <select
          id="userType"
          name="userType"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userType}
        >
          <option value="">Select user type</option>
          <option value="Pupil">Pupil</option>
          <option value="Teacher">Teacher</option>
          <option value="Admin">Admin</option>
        </select>
        {formik.touched.userType && formik.errors.userType && (
          <div>{formik.errors.userType}</div>
        )}
      </div>

      {/* Date of Birth field */}
      {formik.values.userType === "Pupil" && (
        <div>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dateOfBirth}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <div>{formik.errors.dateOfBirth}</div>
          )}
        </div>
      )}

      {/* Year Group field */}
      {formik.values.userType === "Pupil" && (
        <div>
          <label htmlFor="yearGroup">Year Group</label>
          <input
            id="yearGroup"
            name="yearGroup"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.yearGroup}
          />
          {formik.touched.yearGroup && formik.errors.yearGroup && (
            <div>{formik.errors.yearGroup}</div>
          )}
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddUpdatePersonForm;
