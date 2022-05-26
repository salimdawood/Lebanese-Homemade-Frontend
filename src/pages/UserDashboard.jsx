import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import * as Axios from 'axios'
import {URL_PATH} from '../path'
import userAuth from '../hooks/userAuth'
import EditForm from '../components/EditForm'
import CardsGallery from '../components/CardsGallery'

const UserDashboard = () => {

  return (
    <>
      <EditForm/>
      <CardsGallery/>
    </>
  )
}

export default UserDashboard