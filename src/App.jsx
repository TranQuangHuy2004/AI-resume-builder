import { useState } from 'react'
import './App.css'
import { Navigate, Outlet } from 'react-router'
import { useUser } from '@clerk/clerk-react'
import Navbar from './components/custom/Nav'
import { Toaster } from './components/ui/sonner'

function App() {
  const [count, setCount] = useState(0)
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/sign-in'}></Navigate>
  }

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Toaster></Toaster>
    </>
  )
}

export default App
