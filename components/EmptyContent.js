import Button from "./ui/Button";

const EmptyContent = () => {
  return (
    <div className="mt-10">
      <div className="center text-lg bg-white p-10 border-b border-gray-900/10 pb-12 shadow-sm w-100 w-2/6">
        <p className="pb-5">Can't see anything?</p>
        <Button link={"/addNewPerson"} title={"Start adding people"} />
      </div>
    </div>
  );
};

export default EmptyContent;
