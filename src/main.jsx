import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import SignInPage from './auth/sign-in/index.jsx'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from './dashboard/resume/[resumeId]/edit'
import ViewResume from './my-resume/[resumeId]/view'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element: <App></App>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume></EditResume>
      }
    ]
  },
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage></SignInPage>
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume></ViewResume>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
