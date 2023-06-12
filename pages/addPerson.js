import { Fragment } from "react";

import { getData } from "@/api-utils";
import AddPerson from "@/components/person/AddPerson";

const AddPersonPage = (props) => {
  const { schools, classes } = props;

  return (
    <Fragment>
      <AddPerson schools={schools} classes={classes} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_HOST;

  //get school data
  const schools = await getData(`${apiUrl}/School/All`);
  const classes = await getData(`${apiUrl}/Class/AllClasses`);

  return {
    props: {
      schools: schools,
      classes: classes,
    },
  };
}

export default AddPersonPage;
