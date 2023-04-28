import { Fragment } from "react";
import { people } from "../dummy-data";
import ViewPeopleTable from "@/components/ViewPeopleTable";
import WelcomeBanner from "@/components/ui/WelcomeBanner";
import EmptyContent from "@/components/EmptyContent";

const HomePage = () => {
  return (
    <Fragment>
      <WelcomeBanner />
      {people.length === 0 ? <EmptyContent /> : <ViewPeopleTable />}
    </Fragment>
  );
};

export default HomePage;
