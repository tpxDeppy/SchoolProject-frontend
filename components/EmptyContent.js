import Button from "./ui/Button";

const EmptyContent = ({ text, buttonLink, buttonTitle }) => {
  return (
    <div className="mt-10">
      <div className="center text-lg bg-white p-10 border-b border-gray-900/10 pb-12 shadow-sm w-100 w-2/6">
        <p className="pb-5">{text}</p>
        <Button link={buttonLink} title={buttonTitle} />
      </div>
    </div>
  );
};

export default EmptyContent;
