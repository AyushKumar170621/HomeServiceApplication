import React from 'react';
import { Outlet,Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({user}) => {
  return (
    user && user.role==="admin"?<Outlet/>:<Navigate to="/"/>
  )
}

export default AdminProtectedRoute