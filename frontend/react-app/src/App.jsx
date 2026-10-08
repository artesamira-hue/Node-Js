import { Alert, Box, CircularProgress } from '@mui/material'
import { Navigate, Route, Routes, useParams } from 'react-router'
import './App.css'
import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { ResetPassword } from './components/ResetPassword'
import { useUserContext } from './context/userContext.jsx'

const ResetPasswordRoute = () => {
  const { token } = useParams()

  return <ResetPassword token={token} />
}

const AuthenticatedApp = () => {
  const { profile, isLoading, authError } = useUserContext()

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress aria-label="Loading your profile" />
      </Box>
    )
  }

  if (profile) {
    return <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Routes>
  }

  return (
    <>
      {authError && <Alert severity="error">{authError}</Alert>}
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  )
}

export const App = () => (
  <Routes>
    <Route path="/reset-password/:token" element={<ResetPasswordRoute />} />
    <Route path="*" element={<AuthenticatedApp />} />
  </Routes>
)
