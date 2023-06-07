import { Fragment } from "react";
import AddUpdateClassForm from "@/components/addUpdateDeleteClasses/AddUpdateClassForm";
import { getData } from "@/api-utils";

const ClassPage = (props) => {
  const { schoolClass } = props;
  return (
    <Fragment>
      <AddUpdateClassForm
        title="Edit class"
        subTitle="Edit "
        buttonTitle="Update"
        schoolClass={schoolClass}
      />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const classId = params.classId.replace(/^\[|\]$/g, "");

  const schoolClass = await getData(`https://localhost:7166/Class/${classId}`);

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
  const classes = await getData("https://localhost:7166/Class/AllClasses");

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
