import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'

const SignedRoute = () => {
  const { user } = useAppSelector((state) => state.admin)

  if (user !== null) {
    return <Navigate to="/admin/basvuru-listesi" />
  }
  return <Outlet />
}

export default SignedRoute
