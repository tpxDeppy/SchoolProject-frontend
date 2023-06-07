import { Fragment } from "react";
import { getData } from "@/api-utils";

import ViewSchoolsTable from "@/components/viewSchools/ViewSchoolsTable";
import EmptyContent from "@/components/ui/EmptyContent";

const SchoolList = (props) => {
  const { schools } = props;

  return (
    <Fragment>
      {schools.length === 0 ? (
        <EmptyContent
          text="Can't see anything?"
          buttonLink="/schoolList/addSchool"
          buttonTitle="Start adding schools"
        />
      ) : (
        <ViewSchoolsTable schools={schools} />
      )}
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

export default SchoolList;
