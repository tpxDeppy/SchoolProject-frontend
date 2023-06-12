import { useRouter } from "next/router";

import { postData } from "@/api-utils";
import AddUpdateSchoolForm from "./schoolForm/AddUpdateSchoolForm";

const AddSchool = ({ school }) => {
  const { push } = useRouter();

  const onSubmit = async (values, actions) => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    //add new school
    await postData(`${apiUrl}/School/AddSchool`, values);
    alert("School was successfully added");
    push("/schoolList");

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
    />
  );
};

export default AddSchool;
