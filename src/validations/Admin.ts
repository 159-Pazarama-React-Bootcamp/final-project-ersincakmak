import * as yup from 'yup'

const adminLoginSchema = yup.object().shape({
  username: yup.string().required().label('Username'),
  password: yup.string().required().label('Password'),
})

export default adminLoginSchema
