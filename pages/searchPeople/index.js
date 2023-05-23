import { Fragment } from "react";
import { getData } from "@/api-utils";

import EmptyContent from "@/components/EmptyContent";
import SearchForm from "@/components/SearchForm";
import ViewPeopleByQuery from "@/components/ViewPeopleByQuery";

const PeopleSearchPage = (props) => {
  const { people, schools } = props;

  return (
    <Fragment>
      <SearchForm />
      {people.length === 0 ? (
        <EmptyContent
          text="Can't see anything?"
          buttonLink="/addNewPerson"
          buttonTitle="Start adding people"
        />
      ) : (
        <ViewPeopleByQuery schools={schools} />
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

export default PeopleSearchPage;
