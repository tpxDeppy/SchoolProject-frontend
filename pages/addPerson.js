import { Fragment } from "react";
import { getData } from "@/api-utils";
import AddUpdatePersonForm from "@/components/addUpdateDeletePeople/AddUpdatePersonForm";

const AddPersonPage = (props) => {
  const { schools } = props;

  return (
    <Fragment>
      <AddUpdatePersonForm
        title="Add a new person"
        subTitle="Add "
        buttonTitle="Add"
        schools={schools}
      />
    </Fragment>
  );
};

export async function getStaticProps() {
  //get school data
  const schools = await getData("https://localhost:7166/School/All");

  return {
    props: {
      schools: schools,
    },
  };
}

export default AddPersonPage;
