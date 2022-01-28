import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NotFound } from '..'
import ApplicationDetail from '../../components/ApplicationDetail'
import PageLoading from '../../components/PageLoading'
import api from '../../constants/axios'
import { IApplication } from '../../types/application'

const Application = () => {
  const { id } = useParams()
  const [application, setApplication] = useState<IApplication | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchApplication = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`application/${id}`)
      setApplication(data.data as IApplication)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplication()
  }, [])

  if (loading) {
    return <PageLoading />
  }

  if (!application) {
    return <NotFound />
  }

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col gap-2 p-3 bg-orange-100">
      <div className="max-w-xl w-full flex flex-col gap-3 mx-auto">
        <ApplicationDetail application={application} />
      </div>
    </div>
  )
}

export default Application
