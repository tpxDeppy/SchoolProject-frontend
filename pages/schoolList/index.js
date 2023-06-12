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
  const apiUrl = process.env.NEXT_PUBLIC_HOST;

  const allSchools = await getData(`${apiUrl}/School/All`);

  return {
    props: {
      schools: allSchools,
    },
  };
}

export default SchoolList;
