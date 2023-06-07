import { Fragment } from "react";

import AddUpdateSchoolForm from "@/components/addUpdateDeleteSchools/AddUpdateSchoolForm";

const AddSchoolPage = (props) => {
  const { schools } = props;

  return (
    <Fragment>
      <AddUpdateSchoolForm
        title="Add a new school"
        subTitle="Add "
        buttonTitle="Add"
        schools={schools}
      />
    </Fragment>
  );
};

export default AddSchoolPage;
