import Link from "next/link";

const ViewPeopleTable = ({ people, schools }) => {
  return (
    <div className="md:px-32 py-12 mb-20 w-full">
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
          <tbody data-testid="people" className="text-gray-700">
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

                  <td className="text-left py-3 px-4">
                    {schools.map((school) => {
                      return (
                        person.schoolID === school.schoolID && (
                          <p key={school.schoolID}>{school.schoolName}</p>
                        )
                      );
                    })}
                  </td>

                  <td className="text-left py-3 px-4">
                    {person.personClasses.length > 0
                      ? person.personClasses.map((personClass) => {
                          return (
                            <p key={personClass.classID}>
                              {personClass?.className}
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

export default ViewPeopleTable;
