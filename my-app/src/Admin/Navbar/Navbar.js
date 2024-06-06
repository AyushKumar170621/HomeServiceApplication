// src/Admin/AdminNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../action/userAction';

const AdminNavbar = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/admin/dashboard">Admin Dashboard</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/addservice"><i class="bi bi-plus-circle"></i> Add Service</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/allservice"><i class="bi bi-tools"></i> All Services</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/booking"><i class="bi bi-database-fill"></i> Bookings</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/users"><i class="bi bi-people-fill"></i> Users</Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={logoutHandler}><i class="bi bi-box-arrow-left"></i> Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
