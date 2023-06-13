import { Fragment } from "react";
import { getData } from "@/api-utils";

import ViewPeopleTable from "@/components/viewPeople/ViewPeopleTable";
import WelcomeBanner from "@/components/ui/WelcomeBanner";
import EmptyContent from "@/components/ui/EmptyContent";

const HomePage = (props) => {
  const { people, schools } = props;

  return (
    <Fragment>
      <WelcomeBanner />
      {people.length === 0 ? (
        <EmptyContent
          text="Can't see anything?"
          buttonLink="/addPerson"
          buttonTitle="Start adding people"
        />
      ) : (
        <ViewPeopleTable people={people} schools={schools} />
      )}
    </Fragment>
  );
};

export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_HOST;
  const allPeople = await getData(`${apiUrl}/Person/GetAll`);
  const allSchools = await getData(`${apiUrl}/School/All`);

  return {
    props: {
      people: allPeople,
      schools: allSchools,
    },
  };
}

export default HomePage;
