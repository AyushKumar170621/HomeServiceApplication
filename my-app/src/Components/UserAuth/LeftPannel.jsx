import React from "react";
import { Link } from "react-router-dom";
import "./profile.css";

const LeftPannel = ({ setFaq, faqon, logoutHandler, user }) => {
  return (
    <div className="left-pannel">
      <div className="greeting">
        <h1>Hello, {user.name}</h1>
      </div>
      <nav className="nav-links">
        <Link to="/profile/orders">
          <i className="fa fa-box-open"></i> My Orders
        </Link>
        <Link to="/profile/settings">
          <i className="fa fa-user-cog"></i> Account Settings
        </Link>
        <Link to="/profile">
          <i className="fa fa-info-circle"></i> Profile Information
        </Link>
        {user.role === "admin" && (
          <Link to="/admin">
            <i className="fa fa-user-shield"></i> Admin Panel
          </Link>
        )}
        <Link to="/profile/update">
          <i className="fa fa-key"></i> Update Password
        </Link>
        <Link to="#" onClick={() => setFaq(!faqon)}>
          <i className="fa fa-question-circle"></i> View FAQs
        </Link>
       
        <Link to="#" onClick={logoutHandler}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </Link>
      </nav>
    </div>
  );
};

export default LeftPannel;
