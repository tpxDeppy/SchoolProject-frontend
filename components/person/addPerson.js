import { useState } from "react";
import { useRouter } from "next/router";
import { postData } from "@/api-utils";
import AddUpdatePersonForm from "../form/AddUpdatePersonForm";

const AddPerson = ({ schools }) => {
  const { push } = useRouter();

  const onSubmit = async (values) => {
    // await postData("https://localhost:7166/Person/AddPerson", values);
    alert("Person was successfully added");
    console.log('here1');
    push("/");
  };

  return (
    <AddUpdatePersonForm
      title="Add Person"
      subTitle="Add"
      buttonTitle="Add"
      initialValues={{
        firstName: "",
        lastName: "",
        schoolID: "",
        userType: "",
        dateOfBirth: null,
        yearGroup: null,
      }}
      onSubmit={onSubmit}
      schools={schools}
    />
  );
};

export default AddPerson;
