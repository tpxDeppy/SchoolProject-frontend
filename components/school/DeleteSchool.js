import { useRouter } from "next/router";

import { deleteData } from "@/api-utils";
import DeleteModal from "../ui/DeleteModal";

const DeleteSchool = ({ school }) => {
  const { push } = useRouter();

  const handleDelete = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    const schoolID = school?.schoolID;
    await deleteData(`${apiUrl}/School/${schoolID}`);
    push("/schoolList");
  };

  return <DeleteModal modalTitle="school" handleDelete={handleDelete} />;
};

export default DeleteSchool;
