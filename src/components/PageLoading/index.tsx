import React from 'react'
import Spinner from '../Spinner'

const PageLoading = () => (
  <div className="w-screen h-screen flex items-center justify-center bg-orange-200">
    <Spinner size="xl" />
  </div>
)

export default PageLoading
