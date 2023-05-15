import { Fragment } from "react";
import AddPersonForm from "@/components/AddPersonForm";

const AddPersonPage = () => {
  return (
    <Fragment>
      <AddPersonForm
        title="Add a new person"
        subTitle="Add "
        buttonTitle="Add"
      />
    </Fragment>
  );
};

export default AddPersonPage;
