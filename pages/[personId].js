import { Fragment } from "react";

// import { getData } from "@/api-utils";
// import AddUpdatePersonForm from "@/components/form/AddUpdatePersonForm";

// const SinglePersonPage = (props) => {
//   const { person, schools } = props;

const SinglePersonPage = () => {
 return null;
}
//   return (
//     <Fragment>
//       <AddUpdatePersonForm
//         title="Edit person"
//         subTitle="Edit "
//         buttonTitle="Update"
//         person={person}
//         schools={schools}
//       />
//     </Fragment>
//   );
// };

// export async function getStaticProps(context) {
//   const { params } = context;
//   const personId = params.personId;

//   const personIdTrimmed = personId.replace(/^\[|\]$/g, "");

//   //get person data
//   const person = await getData(
//     `https://localhost:7166/Person/${personIdTrimmed}`
//   );

//   //get school data
//   const schools = await getData("https://localhost:7166/School/All");

//   if (!person) {
//     return { notFound: true };
//   }

//   return {
//     props: {
//       person: person,
//       schools: schools,
//     },
//     revalidate: 30,
//   };
// }

// export async function getStaticPaths() {
//   //pregenerate some people
//   const people = await getData("https://localhost:7166/Person/GetAll");

//   const numberOfPeople = 5;
//   const firstFivePeople = people
//     .slice(0, numberOfPeople)
//     .map((person) => person);

//   const idsToPaths = firstFivePeople.map((person) => {
//     return {
//       params: {
//         personId: person.userID,
//       },
//     };
//   });

//   return {
//     paths: idsToPaths,
//     fallback: "blocking",
//   };
// }

export default SinglePersonPage;
