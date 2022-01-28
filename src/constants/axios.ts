import axios from 'axios'

export const getHeaders = () => `Bearer ${localStorage.getItem('token')}`

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export default api
