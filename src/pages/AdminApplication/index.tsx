import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { NotFound } from '..'
import AdminNav from '../../components/AdminNav'
import ApplicationDetail from '../../components/ApplicationDetail'
import PageLoading from '../../components/PageLoading'
import Spinner from '../../components/Spinner'
import {
  createAnswer,
  getOneApplication,
  updateApplicationStatus,
} from '../../redux/slices/adminSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { IStatus } from '../../types/application'
import { createAnswerSchema } from '../../validations/Application'

const toastInstance = (toastMessage: string) =>
  toast.error(toastMessage || 'Error', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

const AdminApplication = () => {
  const [loading, setLoading] = useState(true)
  const [statusLoading, setStatusLoading] = useState(false)
  const [answerLoading, setAnswerLoading] = useState(false)
  const [status, setStatus] = useState<IStatus>('waiting')

  const { application, message } = useAppSelector((state) => state.admin)

  const { id } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (application) setStatus(application.status)
  }, [application])

  const fetchApplication = async () => {
    setLoading(true)
    const { meta } = await dispatch(getOneApplication(id as string))
    if (meta.requestStatus === 'rejected') {
      toastInstance(message)
    }
    setLoading(false)
  }

  const handleUpdateStatus = async () => {
    setStatusLoading(true)
    const { meta } = await dispatch(
      updateApplicationStatus({
        id: id as string,
        status,
      })
    )
    if (meta.requestStatus === 'rejected') {
      toastInstance(message)
    }
    setStatusLoading(false)
  }

  const handleCreateAnswer = async (answerMessage: string) => {
    setAnswerLoading(true)
    const { meta } = await dispatch(
      createAnswer({
        id: id as string,
        message: answerMessage,
      })
    )
    if (meta.requestStatus === 'rejected') {
      toastInstance(message)
    }
    setAnswerLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      answer: '',
    },
    validationSchema: createAnswerSchema,
    onSubmit: async (values, helpers) => {
      await handleCreateAnswer(values.answer)
      helpers.resetForm()
    },
  })

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
    <div className="w-screen h-screen flex flex-col gap-3 bg-orange-100 overflow-auto pb-3">
      <AdminNav />
      <div className="max-w-xl w-full flex flex-col gap-2 mx-auto px-2">
        <h1 className="text-2xl font-bold mb-4 ">
          Application / <span className="break-words">{application._id}</span>
        </h1>
        <div className="flex gap-2 justify-end items-center">
          <div className="relative w-max">
            <div className="absolute right-0 top-0 z-10 transform -translate-x-1/2 translate-y-1/2 pointer-events-none">
              <IoIosArrowDown />
            </div>
            <select
              className="w-32 px-2 py-1 appearance-none rounded cursor-pointer relative outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value as IStatus)}
            >
              <option value="solved">solved</option>
              <option value="waiting">waiting</option>
              <option value="rejected">rejected</option>
            </select>
          </div>
          <button
            type="button"
            className="px-2 py-1 bg-blue-400 hover:bg-blue-500 focus:ring-4 text-white
            focus:ring-blue-300 rounded shadow-sm min-w-[8rem] transition flex items-center
            justify-center"
            onClick={handleUpdateStatus}
            disabled={statusLoading}
          >
            {statusLoading ? <Spinner size="sm" /> : 'Update Status'}
          </button>
        </div>
        <ApplicationDetail application={application} />
        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className="flex gap-2 items-center relative"
          >
            <Field
              name="answer"
              type="text"
              placeholder="Answer here..."
              className="rounded-lg p-2 border-2 border-slate-300 focus:border-slate-500 outline-none flex-1"
            />
            <ErrorMessage
              name="answer"
              render={(errorMessage) => (
                <span className="absolute bottom-0 left-1 transform translate-y-full text-sm text-red-500">
                  {errorMessage}
                </span>
              )}
            />
            <button
              type="submit"
              disabled={answerLoading}
              className="px-3.5 py-2 bg-green-400 hover:bg-green-500 focus:ring-4 text-white
            focus:ring-green-300 rounded shadow-sm transition flex items-center
              justify-center min-w-[8rem]"
            >
              {answerLoading ? <Spinner size="sm" /> : 'Create Answer'}
            </button>
          </form>
        </FormikProvider>
      </div>
    </div>
  )
}

export default AdminApplication
