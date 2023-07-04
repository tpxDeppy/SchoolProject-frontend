import { useState } from "react";

import { putData } from "@/api-utils";
import AddUpdateClassForm from "./classForm/AddUpdateClassForm";

const UpdateClass = ({ schoolClass }) => {
  const [message, setMessage] = useState("");

  const onSubmit = async (values) => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    //update class
    const classID = schoolClass?.classID;
    const updatedValues = {
      classID: classID,
      ...values,
    };
    console.log(values);
    await putData(`${apiUrl}/Class/${classID}`, updatedValues).then(() =>
      setMessage("Class was successfully updated!")
    );
  };

  return (
    <AddUpdateClassForm
      title="Edit class"
      subTitle="Edit "
      buttonTitle="Update"
      initialValues={{
        className: schoolClass?.className,
        classDescription: schoolClass?.classDescription,
      }}
      schoolClass={schoolClass}
      onSubmit={onSubmit}
      message={message}
      setMessage={setMessage}
    />
  );
};

export default UpdateClass;
