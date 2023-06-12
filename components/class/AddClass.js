import { useRouter } from "next/router";

import { postData } from "@/api-utils";
import AddUpdateClassForm from "./classForm/AddUpdateClassForm";

const AddClass = () => {
  const { push } = useRouter();

  const onSubmit = async (values, actions) => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    //add new class
    await postData(`${apiUrl}/Class/AddClass`, values);
    alert("Class was successfully added");
    push("/classList");

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
    />
  );
};

export default AddClass;
