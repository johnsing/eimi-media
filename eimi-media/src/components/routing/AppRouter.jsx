import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../layout/Layout'
import HomePage from '../../pages/HomePage'
import LibraryPage from '../../pages/LibraryPage'
import VideosPage from '../../pages/VideosPage'
import AudioPage from '../../pages/AudioPage'
import FeedPage from '../../pages/FeedPage'
import CreatePage from '../../pages/CreatePage'
import AdminPanel from '../../pages/AdminPanel'
import ProfilePage from '../../pages/ProfilePage'
import Login from '../auth/Login'
import Signup from '../auth/Signup'

// All routes are public — no login required anywhere.
// Auth still works optionally (login/signup pages remain);
// CreatePage and AdminPanel handle logged-out users gracefully.
const AppRouter = () => {
  return (
    <Router>
      <Layout showNavbar={true}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/audio" element={<AudioPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default AppRouter
