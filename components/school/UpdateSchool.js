import { useState } from "react";

import { putData } from "@/api-utils";
import AddUpdateSchoolForm from "./schoolForm/AddUpdateSchoolForm";

const UpdateSchool = ({ school }) => {
  const [message, setMessage] = useState("");

  const onSubmit = async (values, actions) => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    //update school
    const schoolID = school?.schoolID;
    const updatedValues = {
      schoolID: schoolID,
      ...values,
    };
    console.log(values);
    await putData(`${apiUrl}/School/${schoolID}`, updatedValues).then(() =>
      setMessage("School was successfully updated!")
    );

    actions.resetForm();
  };

  return (
    <AddUpdateSchoolForm
      title="Edit School"
      subTitle="Edit "
      buttonTitle="Update"
      initialValues={{
        schoolName: school?.schoolName,
      }}
      school={school}
      onSubmit={onSubmit}
      message={message}
    />
  );
};

export default UpdateSchool;
