import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Spinner from './components/Spinner'
import {
  AdminApplication,
  AdminApplicationList,
  AdminLogin,
  Application,
  ApplicationCreate,
  ApplicationInquiry,
  ApplicationSuccessfull,
  NotFound,
} from './pages'
import { getMe } from './redux/slices/adminSlice'
import { useAppDispatch } from './redux/store'

const App = () => {
  const [loading, setLoading] = useState(true)

  const dispatch = useAppDispatch()

  const checkLogin = async () => {
    await dispatch(getMe())
    setLoading(false)
  }

  useEffect(() => {
    checkLogin()
  }, [])

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-700">
        <Spinner size="xl" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/basvuru-olustur" element={<ApplicationCreate />} />
        <Route path="/basvuru-sorgula" element={<ApplicationInquiry />} />
        <Route path="/basvuru-basarili" element={<ApplicationSuccessfull />} />
        <Route path="/basvuru/:id" element={<Application />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="admin/basvuru-listesi"
            element={<AdminApplicationList />}
          />
          <Route path="admin/basvuru/:id" element={<AdminApplication />} />
        </Route>
        <Route path="/" element={<Navigate to="/basvuru-olustur" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
