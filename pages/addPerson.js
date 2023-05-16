import { Fragment } from "react";
import { getData } from "@/api-utils";
import AddUpdatePersonForm from "@/components/AddUpdatePersonForm";

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
  const schools = await getData("http://localhost:5206/School/All");

  return {
    props: {
      schools: schools,
    },
  };
}

export default AddPersonPage;
