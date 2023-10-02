import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <nav className="navbar navbar-default" style={{ fontSize: "15px" }}>
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to={"/"} className="navbar-brand text-white ">
            <img src="https://img.icons8.com/color/48/e74c3c/storage.png" alt="profile"/>
            User
            <i className="text-info">
              <u>Brain</u>
            </i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
