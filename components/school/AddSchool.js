import { useState } from "react";

import { postData } from "@/api-utils";
import AddUpdateSchoolForm from "./schoolForm/AddUpdateSchoolForm";

const AddSchool = () => {
  const [message, setMessage] = useState("");

  const onSubmit = async (values, actions) => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    //add new school
    await postData(`${apiUrl}/School/AddSchool`, values).then(() =>
      setMessage("School was successfully added!")
    );

    actions.resetForm();
  };

  return (
    <AddUpdateSchoolForm
      title="Add School"
      subTitle="Add "
      buttonTitle="Add"
      initialValues={{
        schoolName: "",
      }}
      onSubmit={onSubmit}
      message={message}
    />
  );
};

export default AddSchool;
