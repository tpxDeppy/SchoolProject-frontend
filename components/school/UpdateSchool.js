import { useRouter } from "next/router";

import { putData } from "@/api-utils";
import AddUpdateSchoolForm from "./schoolForm/AddUpdateSchoolForm";

const UpdateSchool = ({ school }) => {
  const { push } = useRouter();

  const onSubmit = async (values, actions) => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    //update school
    const schoolID = school?.schoolID;
    const updatedValues = {
      schoolID: schoolID,
      ...values,
    };
    console.log(values);
    await putData(`${apiUrl}/School/${schoolID}`, updatedValues);
    alert("School was successfully updated");
    push("/schoolList");

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
    />
  );
};

export default UpdateSchool;
