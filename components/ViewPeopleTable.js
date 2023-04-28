import { people } from "@/dummy-data";

const ViewPeopleTable = () => {
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
                  <td className="text-left py-3 px-4">{person.dateOfBirth}</td>
                  <td className="text-left py-3 px-4">{person.yearGroup}</td>
                  <td className="text-left py-3 px-4">{person.schoolID}</td>
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
