import React,{useEffect,useContext} from 'react'
import EditForm from '../components/EditForm'
import CardsGallery from '../components/CardsGallery'
import { cardContext } from '../context/cardContext'
import { URL_PATH } from '../path'
import * as Axios from 'axios'

const UserDashboard = () => {

  const{setTypesArray} = useContext(cardContext)

  //search for better way
  useEffect(() => {
      Axios.get(URL_PATH+'Types/')
        .then((result)=>{
          console.log(result)
          setTypesArray([...result.data.$values])
        },(error)=>{
          console.log(error)
      }); 
  }, [])
  

  return (
    <>
      <EditForm/>
      <CardsGallery/>
    </>
  )
}

export default UserDashboard