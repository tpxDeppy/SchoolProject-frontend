import { Fragment } from "react";
import AddPersonForm from "@/components/AddPersonForm";

const SinglePersonPage = () => {
  return (
    <Fragment>
      <AddPersonForm
        title="Edit person"
        subTitle="Edit "
        buttonTitle="Update"
      />
    </Fragment>
  );
};

export default SinglePersonPage;
