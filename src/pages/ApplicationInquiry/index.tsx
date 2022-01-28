import { FormikProvider, useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '../../components/TextField'
import { applicationInquirySchema } from '../../validations/Application'

const ApplicationInquiry = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: applicationInquirySchema,
    onSubmit: (values) => navigate(`/basvuru/${values.code}`),
  })

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col gap-2 p-3 bg-orange-100">
      <h1 className="text-3xl text-center">Application Inquiry</h1>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-xl w-full flex flex-col gap-2 mx-auto border-2 border-slate-300 rounded-xl bg-white p-2"
        >
          <TextField
            name="code"
            label="Code"
            placeholder="Your Application Code"
          />
          <button
            type="submit"
            className="bg-green-400 focus:ring-4 focus:ring-green-300 w-max p-1 px-3 rounded-xl"
          >
            Inquiry
          </button>
        </form>
      </FormikProvider>
    </div>
  )
}

export default ApplicationInquiry
