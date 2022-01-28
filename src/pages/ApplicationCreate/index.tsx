import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { DropEvent, FileRejection } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DropZone from '../../components/DropZone'
import FieldWrapper from '../../components/FieldWrapper'
import ImagePreview from '../../components/ImagePreview'
import Spinner from '../../components/Spinner'
import TextField from '../../components/TextField'
import { createApplication } from '../../redux/slices/applicationSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ICreateApplicationPayload } from '../../types/application'
import createApplicationSchema from '../../validations/Application'

const ApplicationCreate = () => {
  const [loading, setLoading] = useState(false)
  const { message } = useAppSelector((state) => state.application)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formik = useFormik<ICreateApplicationPayload>({
    initialValues: {
      firstName: '',
      lastName: '',
      age: '',
      tcNo: '',
      address: '',
      applicationReason: '',
      files: [],
    },
    validationSchema: createApplicationSchema,
    onSubmit: async (values) => {
      const formData = new FormData()
      const { files, ...rest } = values
      files.forEach((file) => {
        formData.append('files', file, file.name)
      })
      Object.entries(rest).forEach((item) => {
        formData.append(item[0], item[1])
      })
      setLoading(true)
      const { meta } = await dispatch(createApplication(formData))
      if (meta.requestStatus === 'fulfilled') {
        navigate('/basvuru-basarili')
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

  const onDrop: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void = (acceptedFiles: File[]) => {
    const filteredAcceptedFiles = acceptedFiles.filter(
      (item) =>
        !formik.values.files.map((file) => file.name).includes(item.name)
    )

    if (formik.values.files.length < 5) {
      formik.setFieldValue(
        'files',
        Array.from(new Set([...formik.values.files, ...filteredAcceptedFiles]))
      )
    }
  }

  const onFileDelete = (name: string) => {
    formik.setFieldValue(
      'files',
      formik.values.files.filter((item) => item.name !== name)
    )
  }

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col gap-2 p-3 bg-orange-100">
      <FormikProvider value={formik}>
        <h1 className="text-3xl text-center">Create an Application</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-xl  flex flex-col gap-3 mx-auto my-3 h-max"
        >
          <FieldWrapper>
            <TextField name="firstName" label="First Name" placeholder="John" />
          </FieldWrapper>
          <FieldWrapper>
            <TextField name="lastName" label="Last Name" placeholder="Doe" />
          </FieldWrapper>
          <FieldWrapper>
            <TextField name="age" label="Age" placeholder="22" type="number" />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              name="tcNo"
              label="Tc No"
              placeholder="Your Tc Identification number"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              name="address"
              label="Address"
              placeholder="Your Address"
              type="textarea"
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              name="applicationReason"
              label="Application Reason"
              placeholder="Reason of your application"
              type="textarea"
            />
          </FieldWrapper>
          <FieldWrapper className="flex flex-col gap-3">
            <p>File(s)</p>
            <DropZone onDrop={onDrop} accept="image/*" maxFiles={3} />
          </FieldWrapper>
          {formik.values.files.length > 0 && (
            <FieldWrapper className="flex flex-col gap-3">
              <p>File(s) Preview</p>
              {formik.values.files.map((item) => (
                <ImagePreview
                  file={item}
                  key={`files_${item.name}`}
                  onDelete={onFileDelete}
                />
              ))}
            </FieldWrapper>
          )}
          <button
            type="submit"
            className="w-max px-3.5 py-1.5 font-semibold transition cursor-pointer bg-teal-500
            rounded hover:bg-teal-600 text-white outline-none focus:ring-4 focus:ring-teal-300
            disabled:cursor-not-allowed min-w-[6rem] flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : 'Create'}
          </button>
        </form>
      </FormikProvider>
    </div>
  )
}

export default ApplicationCreate
