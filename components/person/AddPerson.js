import { useRouter } from "next/router";

import { postData } from "@/api-utils";
import AddUpdatePersonForm from "./personForm/AddUpdatePersonForm";

const AddPerson = ({ schools, classes }) => {
  const { push } = useRouter();

  const onSubmit = async (values, actions) => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    //convert array of ids to array of objects
    const classIDs = [];
    values.personClasses.map((each) => {
      classIDs.push({ classID: each });
    });

    //add new person
    const newValues = {
      ...values,
      personClasses: classIDs,
    };
    console.log(newValues);
    await postData(`${apiUrl}/Person/AddPerson`, newValues);
    alert("Person was successfully added");
    push("/");

    actions.resetForm();
  };

  return (
    <AddUpdatePersonForm
      title="Add Person"
      subTitle="Add "
      buttonTitle="Add"
      initialValues={{
        firstName: "",
        lastName: "",
        schoolID: "",
        userType: "",
        dateOfBirth: null,
        yearGroup: null,
        personClasses: [],
      }}
      schools={schools}
      classes={classes}
      onSubmit={onSubmit}
    />
  );
};

export default AddPerson;
