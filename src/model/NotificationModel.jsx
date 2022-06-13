import React,{useContext,useEffect} from 'react'
import reactDom from 'react-dom'
import { notificationContext } from '../context/notificationContext'
import {Close,CheckCircle,ErrorCircle} from '../components/Svg'

const NotificationModel = () => {
  const {notification,setNotification} = useContext(notificationContext)

  useEffect(()=>{
    setTimeout(function() {
      setNotification({...notification,isShown:false})
         }, notification.time);
       },
   [])


  return (
    notification.isShown && reactDom.createPortal(
      <div className="notification-model">
        <div className={`note-box ${notification.color}`}>
          {notification.message}
          {notification.color === 'red'? <ErrorCircle/> : <CheckCircle/>}
        </div>
      </div>
    ,document.getElementById('notification-model'))
  )
}

export default NotificationModel