import { Fragment } from "react";
import { getAllPeople, getSchools } from "@/api-utils";

import EmptyContent from "@/components/EmptyContent";
import SearchForm from "@/components/SearchForm";
import ViewPeopleTable from "@/components/ViewPeopleTable";

const PeopleSearchPage = (props) => {
  const { people, schools } = props;

  return (
    <Fragment>
      <SearchForm />
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

export default PeopleSearchPage;
