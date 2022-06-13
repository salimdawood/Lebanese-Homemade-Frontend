import React,{createContext,useState} from 'react'


export const notificationContext = createContext(null)

export const NotificationContextProvider = ({children}) => {

  const[notification,setNotification] = useState({
    isShown:false,
    color:null,
    message:null
  })

  return (
    <notificationContext.Provider value={{notification,setNotification}}>
      {children}
    </notificationContext.Provider>
  )
}