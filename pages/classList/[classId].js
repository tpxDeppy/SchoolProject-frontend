import { Fragment } from "react";

import { getData } from "@/api-utils";
import UpdateClass from "@/components/class/UpdateClass";

const apiUrl = process.env.NEXT_PUBLIC_HOST;

const ClassPage = (props) => {
  const { schoolClass } = props;
  return (
    <Fragment>
      <UpdateClass schoolClass={schoolClass} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const classId = params.classId.replace(/^\[|\]$/g, "");

  const schoolClass = await getData(`${apiUrl}/Class/${classId}`);

  if (!schoolClass) {
    return { notFound: true };
  }

  return {
    props: {
      schoolClass: schoolClass,
    },
  };
}

export async function getStaticPaths() {
  const classes = await getData(`${apiUrl}/Class/AllClasses`);

  const idsToPaths = classes.map((schoolClass) => {
    return {
      params: {
        classId: schoolClass.classID,
      },
    };
  });

  return {
    paths: idsToPaths,
    fallback: "blocking",
  };
}

export default ClassPage;
