import { useRouter } from "next/router";

import { deleteData } from "@/api-utils";
import DeleteModal from "../ui/DeleteModal";

const DeletePerson = ({ person }) => {
  const { push } = useRouter();

  const handleDelete = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_HOST;

    const personID = person?.userID;
    await deleteData(`${apiUrl}/Person/${personID}`);
    push("/");
  };

  return <DeleteModal modalTitle="person" handleDelete={handleDelete} />;
};

export default DeletePerson;
