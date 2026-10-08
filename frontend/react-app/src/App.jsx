import { Alert, Box, CircularProgress } from '@mui/material'
import './App.css'
import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { useUserContext } from './context/userContext.jsx'

export const App = () => {
  const { profile, isLoading, authError } = useUserContext()

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress aria-label="Loading your profile" />
      </Box>
    )
  }

  if (profile) {
    return <Profile />
  }

  return (
    <>
      {authError && <Alert severity="error">{authError}</Alert>}
      <Login />
    </>
  )
}
