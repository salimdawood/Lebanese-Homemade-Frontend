import React,{createContext,useState} from 'react'


export const notificationContext = createContext(null)

export const NotificationContextProvider = ({children}) => {

  const[notification,setNotification] = useState({
    isShown:false,
    color:null,
    message:null
  })

  const closeNotification = ()=>{
    //console.log("notification will disappear in 3 sec....")
    setTimeout(function() {
      setNotification({...notification,isShown:false})
    }, 3000)
  }

  return (
    <notificationContext.Provider value={{notification,setNotification,closeNotification}}>
      {children}
    </notificationContext.Provider>
  )
}