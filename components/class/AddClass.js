import { useState } from "react";

import { postData } from "@/api-utils";
import AddUpdateClassForm from "./classForm/AddUpdateClassForm";

const AddClass = () => {
  const [message, setMessage] = useState("");

  const onSubmit = async (values, actions) => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    //add new class
    await postData(`${apiUrl}/Class/AddClass`, values).then(() =>
      setMessage("Class was successfully added!")
    );

    actions.resetForm();
  };

  return (
    <AddUpdateClassForm
      title="Add a new class"
      subTitle="Add "
      buttonTitle="Add"
      initialValues={{
        className: "",
        classDescription: "",
      }}
      onSubmit={onSubmit}
      message={message}
    />
  );
};

export default AddClass;
