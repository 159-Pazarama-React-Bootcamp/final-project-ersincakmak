import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { Link, Navigate } from 'react-router-dom'
import ApplicationDetail from '../../components/ApplicationDetail'
import { useAppSelector } from '../../redux/store'

const ApplicationSuccessfull = () => {
  const { application } = useAppSelector((state) => state.application)

  if (!application) {
    return <Navigate to="/basvuru-olustur" />
  }

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col gap-2 p-3 bg-orange-100">
      <div className="max-w-xl w-full mx-auto flex flex-col gap-3">
        <div
          className="p-3 rounded-xl border-2 border-slate-300 bg-white flex items-center
           gap-3"
        >
          <div
            className="w-10 h-10 rounded-full bg-green-300 text-green-600 flex text-xl
            items-center justify-center shrink-0 self-start"
          >
            <AiOutlineCheck />
          </div>
          <div>
            <p>Your application has been completed successfully.</p>
            <p>
              Your application code :{' '}
              <span className="font-bold break-all">{application?._id}</span>
            </p>
            <p>
              You can check your application with above code on{' '}
              <Link to="/basvuru-sorgula" className="text-blue-500 underline">
                Application Inquiry
              </Link>{' '}
              page.
            </p>
          </div>
        </div>
        <ApplicationDetail application={application} />
      </div>
    </div>
  )
}

export default ApplicationSuccessfull
