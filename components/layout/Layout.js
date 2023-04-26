import { Fragment } from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <NavBar />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
