import EmptyContent from "@/components/EmptyContent";
import SearchForm from "@/components/SearchForm";
import ViewPeopleTable from "@/components/ViewPeopleTable";
import { getAllPeople } from "@/api-utils";
import { Fragment } from "react";

const PeopleSearchPage = (props) => {
  const { people } = props;

  return (
    <Fragment>
      <SearchForm />
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

export default PeopleSearchPage;
