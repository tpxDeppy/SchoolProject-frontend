import SearchForm from "@/components/SearchForm";
import ViewPeopleTable from "@/components/ViewPeopleTable";
import Link from "next/link";
import { Fragment } from "react";

const PeopleSearchPage = () => {
  return (
    <Fragment>
      <SearchForm />
      <ViewPeopleTable />
    </Fragment>
  );
};

export default PeopleSearchPage;
