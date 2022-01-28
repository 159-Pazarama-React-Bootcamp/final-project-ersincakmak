import * as yup from 'yup'

const createApplicationSchema = yup.object().shape({
  firstName: yup.string().required().min(3).label('First Name'),
  lastName: yup.string().required().min(3).label('Last Name'),
  age: yup.number().required().positive().label('Age'),
  applicationReason: yup
    .string()
    .min(10)
    .required()
    .label('Application Reason'),
  tcNo: yup
    .string()
    .required()
    .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, 'Invalid Tc No')
    .label('Tc No'),
  address: yup.string().required().min(5).label('Address'),
})

export const applicationInquirySchema = yup.object().shape({
  code: yup.string().required().label('Code'),
})

export const createAnswerSchema = yup.object().shape({
  answer: yup.string().min(5).required().label('Answer'),
})

export default createApplicationSchema
