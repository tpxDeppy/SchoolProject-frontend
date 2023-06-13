import { Fragment, useEffect } from "react";
import { getData } from "@/api-utils";

import ViewPeopleByQuery from "@/components/viewPeople/ViewPeopleByQuery";
import SearchByMultipleFields from "@/components/searchPeople/SearchByMultipleFields";

const PeopleSearchPage = (props) => {
  const { schools, classes } = props;

  return (
    <Fragment>
      <SearchByMultipleFields schools={schools} classes={classes} />
      <ViewPeopleByQuery schools={schools} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_HOST;

  const allSchools = await getData(`${apiUrl}/School/All`);
  const allClasses = await getData(`${apiUrl}/Class/AllClasses`);

  return {
    props: {
      schools: allSchools,
      classes: allClasses,
    },
  };
}

export default PeopleSearchPage;
