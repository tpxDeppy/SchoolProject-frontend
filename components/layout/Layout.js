import { Fragment } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className="min-h-screen overflow-hidden block relative pb-100">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Layout;
