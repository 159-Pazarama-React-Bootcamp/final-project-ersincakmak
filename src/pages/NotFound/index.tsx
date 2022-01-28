import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="w-screen h-screen bg-orange-100 flex">
    <div className="flex flex-col items-center gap-3 m-auto w-max">
      <h1 className="text-5xl font-semibold">404 Not Found</h1>
      <p className="text-center">
        For application inquiry go to{' '}
        <Link to="/basvuru-sorgula" className="text-blue-400 underline">
          Application Inquiry Page
        </Link>
      </p>
    </div>
  </div>
)

export default NotFound
