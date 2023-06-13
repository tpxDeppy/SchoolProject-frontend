import { Fragment } from "react";

import { getData } from "@/api-utils";
import UpdateSchool from "@/components/school/UpdateSchool";

const apiUrl = process.env.NEXT_PUBLIC_HOST;

const SchoolPage = (props) => {
  const { school } = props;
  return (
    <Fragment>
      <UpdateSchool school={school} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const schoolId = params.schoolId.replace(/^\[|\]$/g, "");

  const school = await getData(`${apiUrl}/School/${schoolId}`);

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
  const schools = await getData(`${apiUrl}/School/All`);

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
