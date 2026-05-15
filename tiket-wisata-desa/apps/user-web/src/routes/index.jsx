import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import LandingPage from '../pages/Landing/LandingPage'
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import HomePage from '../pages/Home/HomePage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route path='/login' element={<LoginPage />} />

        <Route
          path='/register'
          element={<RegisterPage />}
        />

        <Route path='/home' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}