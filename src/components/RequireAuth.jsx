import React from 'react'
import {Navigate,useLocation,Outlet } from 'react-router-dom'
import userAuth from '../hooks/userAuth'


const RequireAuth = () => {
  const {userProfile} = userAuth()
  const location = useLocation()
  return (
    userProfile.name? <Outlet/> : <Navigate to="/signin" state={{from:location}} replace />
  )
}

export default RequireAuth