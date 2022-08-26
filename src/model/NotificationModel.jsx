import React,{useContext} from 'react'
import reactDom from 'react-dom'
//context
import { notificationContext } from '../context/notificationContext'
//components
import {CheckCircle,ErrorCircle} from '../components/Svg'

const NotificationModel = () => {
  const {notification} = useContext(notificationContext)

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