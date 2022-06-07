import React from 'react'
import {Navigate,useLocation,Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const RequireAuth = () => {
  const {userProfile} = useAuth()
  const location = useLocation()
  return (
    userProfile.name? <Outlet/> : <Navigate to="/signin" state={{from:location}} replace />
  )
}

export default RequireAuth