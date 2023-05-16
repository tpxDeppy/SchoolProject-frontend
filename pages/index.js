import { Fragment } from "react";
import { getData } from "@/api-utils";

import ViewPeopleTable from "@/components/ViewPeopleTable";
import WelcomeBanner from "@/components/ui/WelcomeBanner";
import EmptyContent from "@/components/EmptyContent";

const HomePage = (props) => {
  const { people, schools } = props;

  return (
    <Fragment>
      <WelcomeBanner />
      {people.length === 0 ? (
        <EmptyContent
          text="Can't see anything?"
          buttonLink="/addNewPerson"
          buttonTitle="Start adding people"
        />
      ) : (
        <ViewPeopleTable people={people} schools={schools} />
      )}
    </Fragment>
  );
};

export async function getStaticProps() {
  const allPeople = await getData("http://localhost:5206/Person/GetAll");
  const allSchools = await getData("http://localhost:5206/School/All");

  return {
    props: {
      people: allPeople,
      schools: allSchools,
    },
  };
}

export default HomePage;
