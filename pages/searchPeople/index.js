import EmptyContent from "@/components/EmptyContent";
import SearchForm from "@/components/SearchForm";
import ViewPeopleTable from "@/components/ViewPeopleTable";
import { people } from "@/dummy-data";
import { Fragment } from "react";

const PeopleSearchPage = () => {
  return (
    <Fragment>
      <SearchForm />
      {people.length === 0 ? <EmptyContent /> : <ViewPeopleTable />}
    </Fragment>
  );
};

export default PeopleSearchPage;
