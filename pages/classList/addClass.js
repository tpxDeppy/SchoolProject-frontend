import { Fragment } from "react";

import AddUpdateClassForm from "@/components/addUpdateDeleteClasses/AddUpdateClassForm";

const AddSchoolPage = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <AddUpdateClassForm
        title="Add a new class"
        subTitle="Add "
        buttonTitle="Add"
        classes={classes}
      />
    </Fragment>
  );
};

export default AddSchoolPage;
