import Link from "next/link";

const Button = ({ link, title }) => {
  return (
    <Link
      href={link}
      className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {title}
    </Link>
  );
};

export default Button;
