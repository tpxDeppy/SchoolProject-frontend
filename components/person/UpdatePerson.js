import { useState } from "react";

import { putData } from "@/api-utils";
import AddUpdatePersonForm from "./personForm/AddUpdatePersonForm";

const UpdatePerson = ({ person, schools, classes }) => {
  const [message, setMessage] = useState("");

  const onSubmit = async (values, actions) => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    //convert array of ids to array of objects
    const classIDs = [];
    values.personClasses.map((each) => {
      if (typeof each === "string") {
        classIDs.push({ classID: each });
      } else {
        classIDs.push(each);
      }
    });

    //update person
    if (values.userType === "Teacher") {
      values.dateOfBirth = null;
      values.yearGroup = null;
    }
    const personID = person?.userID;
    const updatedValues = {
      userID: personID,
      ...values,
      personClasses: classIDs,
    };
    console.log(updatedValues);
    await putData(`${apiUrl}/Person/${personID}`, updatedValues).then(() =>
      setMessage("Person was successfully updated!")
    );

    actions.resetForm();
  };

  return (
    <AddUpdatePersonForm
      title="Edit Person"
      subTitle="Edit "
      buttonTitle="Update"
      initialValues={{
        firstName: person?.firstName,
        lastName: person?.lastName,
        schoolID: person?.schoolID,
        userType: person?.userType,
        dateOfBirth:
          (person?.dateOfBirth !== null && person?.dateOfBirth.slice(0, 10)) ||
          (person?.dateOfBirth === null && null),
        yearGroup: person?.yearGroup || (person?.yearGroup === null && null),
        personClasses: person?.personClasses || [],
      }}
      person={person}
      schools={schools}
      classes={classes}
      onSubmit={onSubmit}
      message={message}
    />
  );
};

export default UpdatePerson;
