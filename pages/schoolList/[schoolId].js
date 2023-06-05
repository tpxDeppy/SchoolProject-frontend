import { Fragment } from "react";
import AddUpdateSchoolForm from "@/components/addUpdateDeleteSchools/AddUpdateSchoolForm";
import { getData } from "@/api-utils";

const SchoolPage = (props) => {
  const { school } = props;
  return (
    <Fragment>
      <AddUpdateSchoolForm
        title="Edit school"
        subTitle="Edit "
        buttonTitle="Update"
        school={school}
      />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const schoolId = params.schoolId.replace(/^\[|\]$/g, "");

  const school = await getData(`https://localhost:7166/School/${schoolId}`);

  if (!school) {
    return { notFound: true };
  }

  return {
    props: {
      school: school,
    },
  };
}

export async function getStaticPaths() {
  const schools = await getData("https://localhost:7166/School/All");

  const idsToPaths = schools.map((school) => {
    return {
      params: {
        schoolId: school.schoolID,
      },
    };
  });

  return {
    paths: idsToPaths,
    fallback: "blocking",
  };
}

export default SchoolPage;
