import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'

const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.admin)

  if (user === null) {
    return <Navigate to="/admin" />
  }
  return <Outlet />
}

export default ProtectedRoute
