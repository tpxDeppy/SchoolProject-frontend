import { Fragment } from "react";
import { people } from "../dummy-data";
import ViewPeopleTable from "@/components/ViewPeopleTable";

const HomePage = () => {
  return (
    <ViewPeopleTable />
    // <div>
    //   {people.map((person) => (
    //     <li>{person.firstName}</li>
    //   ))}
    // </div>
  );
};

export default HomePage;
