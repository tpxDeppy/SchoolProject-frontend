import Link from "next/link";

const ViewPeopleTable = ({ people, schools }) => {
  return (
    <div className="md:px-32 py-12 w-full">
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
            {people.map((person) => {
              return (
                <tr key={person.userID}>
                  <td className="text-left py-3 px-4">{person.userID}</td>
                  <td className="text-left py-3 px-4">{person.firstName}</td>
                  <td className="text-left py-3 px-4">{person.lastName}</td>
                  <td className="text-left py-3 px-4">{person.userType}</td>
                  {person.dateOfBirth === null && (
                    <td className="text-left py-3 px-4">-</td>
                  )}
                  {person.dateOfBirth !== null && (
                    <td className="text-left py-3 px-4">
                      {person.dateOfBirth.slice(0, 10)}
                    </td>
                  )}
                  {person.yearGroup === null && (
                    <td className="text-left py-3 px-4">-</td>
                  )}
                  {person.yearGroup !== null && (
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

export default ViewPeopleTable;
