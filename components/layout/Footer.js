const Footer = () => {
  const getCurrentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center w-full p-4 bg-white text-gray-800">
      <div className="text-center">
        <p>Copyright © {getCurrentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
