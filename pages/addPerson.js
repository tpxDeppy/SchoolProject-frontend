import { Fragment } from "react";
import { getData } from "@/api-utils";
import AddPerson from "@/components/person/addPerson";

const AddPersonPage = (props) => {
  const { schools } = props;

  return (
    <div>
      <AddPerson />
    </div>
  );
};

export async function getStaticProps() {
  //get school data
  // const schools = await getData("https://localhost:7166/School/All");

  return {
    props: {
      schools: {},
    },
  };
}

export default AddPersonPage;
