import { Fragment } from "react";

import { getData } from "@/api-utils";
import UpdatePerson from "@/components/person/UpdatePerson";

const apiUrl = process.env.NEXT_PUBLIC_HOST;

const SinglePersonPage = (props) => {
  const { person, schools, classes } = props;

  return (
    <Fragment>
      <UpdatePerson person={person} schools={schools} classes={classes} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const personId = params.personId;

  const personIdTrimmed = personId.replace(/^\[|\]$/g, "");

  //get person data
  const person = await getData(`${apiUrl}/Person/${personIdTrimmed}`);

  //get school data
  const schools = await getData(`${apiUrl}/School/All`);
  //get class data
  const allClasses = await getData(`${apiUrl}/Class/AllClasses`);

  if (!person) {
    return { notFound: true };
  }

  return {
    props: {
      person: person,
      schools: schools,
      classes: allClasses,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  //pregenerate some people
  const people = await getData(`${apiUrl}/Person/GetAll`);

  const numberOfPeople = 5;
  const firstFivePeople = people
    .slice(0, numberOfPeople)
    .map((person) => person);

  const idsToPaths = firstFivePeople.map((person) => {
    return {
      params: {
        personId: person.userID,
      },
    };
  });

  return {
    paths: idsToPaths,
    fallback: "blocking",
  };
}

export default SinglePersonPage;
