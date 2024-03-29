import { Fragment } from "react";
import { getData } from "@/api-utils";

import ViewClassesTable from "@/components/viewClasses/ViewClassesTable";
import EmptyContent from "@/components/ui/EmptyContent";

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
  const apiUrl = process.env.NEXT_PUBLIC_HOST;

  const allClasses = await getData(`${apiUrl}/Class/AllClasses`);

  return {
    props: {
      classes: allClasses,
    },
  };
}

export default ClassList;
