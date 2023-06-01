import { useState } from "react";
import { useRouter } from "next/router";
import { putData } from "@/api-utils";
import AddUpdatePersonForm from "../AddUpdatePersonFormform";

const UpdatePerson = ({ person, schools }) => {
  const { push } = useRouter();

  const onSubmit = async (values) => {
    if (values.userType === "Teacher") {
      values.dateOfBirth = null;
      values.yearGroup = null;
    }
    const personID = person?.userID;
    const updatedValues = {
      userID: personID,
      ...values,
    };
    await putData(`https://localhost:7166/Person/${personID}`, updatedValues);
    alert("Person was successfully updated");
    push("/");
  };

  return (
    <AddUpdatePersonForm
      title="Update Person"
      subTitle="Update"
      buttonTitle="Update"
      person={person}
      initialValues={{
        firstName: person?.firstName,
        lastName: person?.lastName,
        schoolID: person?.schoolID,
        userType: person?.userType,
        dateOfBirth:
          person?.dateOfBirth !== null ? person?.dateOfBirth.slice(0, 10) : null,
        yearGroup: person?.yearGroup,
      }}
      onSubmit={onSubmit}
      schools={schools}
    />
  );
};

export default UpdatePerson;
