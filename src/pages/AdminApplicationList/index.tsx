import React, { useEffect, useState } from 'react'
import AdminNav from '../../components/AdminNav'
import ApplicationRow from '../../components/ApplicationRow'
import Spinner from '../../components/Spinner'
import { getApplications } from '../../redux/slices/adminSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'

const AdminApplications = () => {
  const [loading, setLoading] = useState(false)
  const { applications } = useAppSelector((state) => state.admin)

  const dispatch = useAppDispatch()

  const handleFetchApplications = async () => {
    setLoading(true)
    await dispatch(getApplications())
    setLoading(false)
  }

  useEffect(() => {
    handleFetchApplications()
  }, [])

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col gap-3 bg-orange-100">
      <AdminNav />
      <div className="max-w-xl w-full flex flex-col gap-2 mx-auto px-2">
        <h1 className="font-bold text-2xl mb-4">Application List</h1>
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        )}
        {applications.length < 1
          ? 'There is no application yet.'
          : applications.map((item) => (
              <ApplicationRow application={item} key={item._id} />
            ))}
      </div>
    </div>
  )
}

export default AdminApplications
