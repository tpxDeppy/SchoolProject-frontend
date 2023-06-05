import { Fragment } from "react";
import { getData } from "@/api-utils";

import ViewClassesTable from "@/components/viewClasses/ViewClassesTable";

const ClassList = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      {classes.length === 0 ? (
        <EmptyContent
          text="Can't see anything?"
          buttonLink="/classList/addClass"
          buttonTitle="Start adding classes"
        />
      ) : (
        <ViewClassesTable classes={classes} />
      )}
    </Fragment>
  );
};

export async function getStaticProps() {
  const allClasses = await getData("https://localhost:7166/Class/AllClasses");

  return {
    props: {
      classes: allClasses,
    },
  };
}

export default ClassList;
