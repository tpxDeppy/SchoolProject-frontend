import { Fragment } from "react";
import { getAllPeople } from "@/api-utils";
import ViewPeopleTable from "@/components/ViewPeopleTable";
import WelcomeBanner from "@/components/ui/WelcomeBanner";
import EmptyContent from "@/components/EmptyContent";

const HomePage = (props) => {
  const { people } = props;
  console.log(people);

  return (
    <Fragment>
      <WelcomeBanner />
      {people.length === 0 ? (
        <EmptyContent />
      ) : (
        <ViewPeopleTable people={people} />
      )}
    </Fragment>
  );
};

export async function getStaticProps() {
  const allPeople = await getAllPeople();

  console.log(allPeople);

  return {
    props: {
      people: allPeople,
    },
  };
}

export default HomePage;
