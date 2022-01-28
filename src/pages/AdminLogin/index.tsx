import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FieldWrapper from '../../components/FieldWrapper'
import Spinner from '../../components/Spinner'
import TextField from '../../components/TextField'
import { login } from '../../redux/slices/adminSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import adminLoginSchema from '../../validations/Admin'

const AdminLogin = () => {
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const { message } = useAppSelector((state) => state.admin)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: adminLoginSchema,
    onSubmit: async (values) => {
      setLoading(true)
      const { meta } = await dispatch(login(values))
      if (meta.requestStatus === 'fulfilled') {
        navigate('/admin/basvuru-listesi')
      } else {
        toast.error(message || 'Error', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      setLoading(false)
    },
  })

  return (
    <div className="bg-orange-100 w-screen h-screen overflow-auto flex flex-col p-3">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="max-w-xl w-full m-auto">
          <FieldWrapper className="flex flex-col gap-3">
            <h1 className="text-center font-semibold text-3xl">Admin Login</h1>
            <TextField
              label="Username"
              name="username"
              placeholder="Your username"
            />
            <TextField
              type="password"
              label="Password"
              name="password"
              placeholder="Your password"
            />
            <button
              type="submit"
              className="w-max px-3 py-1 outline-none bg-green-400 focus:ring-4 focus:ring-green-300 rounded-md
              min-w-[6rem] flex items-center justify-center"
            >
              {loading ? <Spinner size="sm" /> : 'Login'}
            </button>
          </FieldWrapper>
        </form>
      </FormikProvider>
    </div>
  )
}

export default AdminLogin
