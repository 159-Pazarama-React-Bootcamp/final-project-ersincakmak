import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/slices/adminSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'

const AdminNav = () => {
  const { user } = useAppSelector((state) => state.admin)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div
      className="bg-orange-50 p-3 px-6 border-b-2 border-orange-500 sticky w-full top-0
        z-20"
    >
      <div className="container flex items-center justify-between mx-auto">
        <Link
          to="/admin/basvuru-listesi"
          className="text-orange-500 font-semibold"
        >
          Application List
        </Link>
        <div>
          <span className="underline">@{user?.username}</span>
          <button
            type="button"
            className="ml-3 text-red-600 font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminNav
