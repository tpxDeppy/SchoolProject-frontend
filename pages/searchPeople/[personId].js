import { Fragment } from "react";
import AddPeopleForm from "@/components/AddPeopleForm";

const SinglePersonPage = () => {
  return (
    <Fragment>
      <AddPeopleForm
        title="Edit person"
        subTitle="Edit "
        buttonTitle="Update"
      />
    </Fragment>
  );
};

export default SinglePersonPage;
