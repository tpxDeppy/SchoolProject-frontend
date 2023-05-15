import { Fragment } from "react";
import { getAllPeople, getSchools } from "@/api-utils";

import ViewPeopleTable from "@/components/ViewPeopleTable";
import WelcomeBanner from "@/components/ui/WelcomeBanner";
import EmptyContent from "@/components/EmptyContent";

const HomePage = (props) => {
  const { people, schools } = props;

  return (
    <Fragment>
      <WelcomeBanner />
      {people.length === 0 ? (
        <EmptyContent />
      ) : (
        <ViewPeopleTable people={people} schools={schools} />
      )}
    </Fragment>
  );
};

export async function getStaticProps() {
  const allPeople = await getAllPeople();
  const allSchools = await getSchools();

  return {
    props: {
      people: allPeople,
      schools: allSchools,
    },
  };
}

export default HomePage;
