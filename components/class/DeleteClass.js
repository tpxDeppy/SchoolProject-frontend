import { useRouter } from "next/router";

import { deleteData } from "@/api-utils";
import DeleteModal from "../ui/DeleteModal";

const DeleteClass = ({ schoolClass }) => {
  const { push } = useRouter();

  const handleDelete = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    const classID = schoolClass?.classID;
    await deleteData(`${apiUrl}/Class/${classID}`);
    push("/classList");
  };

  return <DeleteModal modalTitle="class" handleDelete={handleDelete} />;
};

export default DeleteClass;
