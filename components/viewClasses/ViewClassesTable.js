import Link from "next/link";

const ViewClassesTable = ({ classes }) => {
  return (
    <div className="md:px-32 py-12 mb-20 w-1/2 mx-auto">
      <div className="center">
        <p className="font-semibold text-lg pb-8">View all classes</p>
      </div>
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-cyan-700 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Class ID
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Class Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Class Description
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm" />
            </tr>
          </thead>
          <tbody data-testid="classes" className="text-gray-700">
            {classes.map((eachClass) => {
              return (
                <tr key={eachClass.classID}>
                  <td className="text-left py-3 px-4">
                    {eachClass.classID.slice(0, 8)}
                  </td>

                  <td className="text-left py-3 px-4">{eachClass.className}</td>

                  <td className="text-left py-3 px-4">
                    {eachClass.classDescription}
                  </td>

                  <td className="text-center py-3 px-4">
                    <Link
                      href={`/classList/[${eachClass.classID}]`}
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

export default ViewClassesTable;
