import Link from "next/link";

const ViewSchoolsTable = ({ schools }) => {
  return (
    <div className="md:px-32 py-12 mb-20 w-1/2 mx-auto">
      <div className="center">
        <p className="font-semibold text-lg pb-8">View all schools</p>
      </div>
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-cyan-700 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                School ID
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                School Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm" />
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {schools.map((school) => {
              return (
                <tr key={school.schoolID}>
                  <td className="text-left py-3 px-4">
                    {school.schoolID.slice(0, 8)}
                  </td>

                  <td className="text-left py-3 px-4">{school.schoolName}</td>

                  <td className="text-center py-3 px-4">
                    <Link
                      href={`/schoolList/[${school.schoolID}]`}
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

export default ViewSchoolsTable;
