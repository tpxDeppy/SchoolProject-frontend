import { Fragment, useEffect } from "react";
import { getData } from "@/api-utils";

import ViewPeopleByQuery from "@/components/viewPeople/ViewPeopleByQuery";
import SearchByMultipleFields from "@/components/searchPeople/SearchByMultipleFields";

const PeopleSearchPage = (props) => {
  const { schools } = props;

  return (
    <Fragment>
      <SearchByMultipleFields schools={schools} />
      <ViewPeopleByQuery schools={schools} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const allSchools = await getData("https://localhost:7166/School/All");

  return {
    props: {
      schools: allSchools,
    },
  };
}

export default PeopleSearchPage;
