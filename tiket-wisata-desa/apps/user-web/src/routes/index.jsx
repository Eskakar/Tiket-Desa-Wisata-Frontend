import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import LandingPage from '../pages/Landing/LandingPage'
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import SearchResultPage from '../pages/Wisata/SearchResultPage'
import TagResultPage from '../pages/Wisata/TagResultPage'
import HomePage from '../pages/Home/HomePage'
import WisataDetailPage from '../pages/Wisata/WisataDetailPage'
import ProfilePage from '../pages/Profile/ProfilePage'
import AboutPage from '../pages/About/AboutPage'
import ProtectedRoute from './ProtectedRoute'

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

        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/wisata/search'
          element={<SearchResultPage />}
        />

        <Route
          path='/wisata/tag/:tag'
          element={<TagResultPage />}
        />

        <Route
          path='/wisata/:slug'
          element={<WisataDetailPage />}
        />

        <Route
          path='/about'
          element={<AboutPage />}
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}