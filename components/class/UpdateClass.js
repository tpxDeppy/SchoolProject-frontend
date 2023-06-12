import { useRouter } from "next/router";

import { putData } from "@/api-utils";
import AddUpdateClassForm from "./classForm/AddUpdateClassForm";

const UpdateClass = ({ schoolClass }) => {
  const { push } = useRouter();

  const onSubmit = async (values, actions) => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    //update class
    const classID = schoolClass?.classID;
    const updatedValues = {
      classID: classID,
      ...values,
    };
    console.log(values);
    await putData(`${apiUrl}/Class/${classID}`, updatedValues);
    alert("Class was successfully updated");
    push("/classList");

    actions.resetForm();
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
    />
  );
};

export default UpdateClass;
