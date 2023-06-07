import { Fragment } from "react";
import { getData } from "@/api-utils";
import AddUpdatePersonForm from "@/components/addUpdateDeletePeople/AddUpdatePersonForm";

const AddPersonPage = (props) => {
  const { schools, classes } = props;

  return (
    <Fragment>
      <AddUpdatePersonForm
        title="Add a new person"
        subTitle="Add "
        buttonTitle="Add"
        schools={schools}
        classes={classes}
      />
    </Fragment>
  );
};

export async function getStaticProps() {
  //get school data
  const schools = await getData("https://localhost:7166/School/All");
  const classes = await getData("https://localhost:7166/Class/AllClasses");

  return {
    props: {
      schools: schools,
      classes: classes,
    },
  };
}

export default AddPersonPage;
