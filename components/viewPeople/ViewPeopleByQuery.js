import { useContext } from "react";
import { SearchPeopleContext } from "@/pages/searchPeople/searchPeopleContext";
import Link from "next/link";

const ViewPeopleByQuery = ({ schools }) => {
  const { searchResults, error, errorMessage } =
    useContext(SearchPeopleContext);
  const people = searchResults;

  if (error) {
    return (
      <div className="center text-lg pt-20 text-cyan-800">{errorMessage}</div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="flex justify-center mt-20">
        <div className="text-lg text-cyan-900">Start searching </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-cyan-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="md:px-32 mb-20 py-12 w-full">
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
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Classes
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm" />
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {people.map((person) => {
              return (
                <tr key={person.userID}>
                  <td className="text-left py-3 px-4">
                    {person.userID.slice(0, 8)}
                  </td>

                  <td className="text-left py-3 px-4">{person.firstName}</td>

                  <td className="text-left py-3 px-4">{person.lastName}</td>

                  <td className="text-left py-3 px-4">{person.userType}</td>

                  {person.dateOfBirth === null ? (
                    <td className="text-left py-3 px-4">-</td>
                  ) : (
                    <td className="text-left py-3 px-4">
                      {person.dateOfBirth.slice(0, 10)}
                    </td>
                  )}

                  {person.yearGroup === null ? (
                    <td className="text-left py-3 px-4">-</td>
                  ) : (
                    <td className="text-left py-3 px-4">{person.yearGroup}</td>
                  )}

                  {schools.map((school) => {
                    return (
                      person.schoolID === school.schoolID && (
                        <td
                          key={school.schoolID}
                          className="text-left py-3 px-4"
                        >
                          {school.schoolName}
                        </td>
                      )
                    );
                  })}

                  <td className="text-left py-3 px-4">
                    {person.personClasses.length > 0
                      ? person.personClasses.map((personClass) => {
                          return (
                            <p key={personClass.classID}>
                              {personClass?.class?.className}
                            </p>
                          );
                        })
                      : "-"}
                  </td>

                  <td className="text-center py-3 px-4">
                    <Link
                      href={`/[${person.userID}]`}
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

export default ViewPeopleByQuery;
