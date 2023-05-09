import { getAllPeople } from "@/api-utils";
import { useEffect, useState } from "react";
import useSWR from "swr";

const ViewPeopleTable = (props) => {
  const [loadedPeople, setLoadedPeople] = useState();

  // const url = "https://localhost:7166/Person/GetAll";
  // const { initialData, error } = useSWR(url, (url) => {
  //   fetch(url).then((res) => res.json());
  // });

  // useEffect(() => {
  //   if (initialData) {
  //     const people = initialData.data;
  //     setLoadedPeople(people);
  //   }
  // }, [initialData]);

  // // const { people } = props;
  // // console.log(people);

  if (!loadedPeople) {
    return <p className="center pt-6">Loading...</p>;
  }

  return (
    <div className="md:px-32 py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-cyan-700 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                User ID
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                First Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Last name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                User type
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Date of birth
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Year group
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                School
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loadedPeople.map((person) => {
              return (
                <tr key={person.userID}>
                  <td className="text-left py-3 px-4">{person.userID}</td>
                  <td className="text-left py-3 px-4">{person.firstName}</td>
                  <td className="text-left py-3 px-4">{person.lastName}</td>
                  <td className="text-left py-3 px-4">{person.userType}</td>
                  <td className="text-left py-3 px-4">{person.dateOfBirth}</td>
                  <td className="text-left py-3 px-4">{person.yearGroup}</td>
                  <td className="text-left py-3 px-4">{person.schoolID}</td>
                  <td className="text-center py-3 px-4">
                    <Link
                      href={`/searchPeople/[${person.userID}]`}
                      className="font-semibold text-cyan"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const allPeople = await getAllPeople();
  console.log(allPeople);

  return {
    props: {
      people: allPeople,
    },
  };
}

export default ViewPeopleTable;
