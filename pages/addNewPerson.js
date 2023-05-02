import { Fragment } from "react";
import AddPeopleForm from "@/components/AddPeopleForm";

const AddNewPersonPage = () => {
  return (
    <Fragment>
      <AddPeopleForm
        title="Add a new person"
        subTitle="Add "
        buttonTitle="Add"
      />
    </Fragment>
  );
};

export default AddNewPersonPage;
