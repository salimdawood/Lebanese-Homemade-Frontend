import React,{useState,useContext} from 'react'
//email
import emailjs from 'emailjs-com'
//component
import Loading from '../components/Loading'
//context
import {notificationContext} from '../context/notificationContext'

const ContactUs = () => {
  //notification for better ui
  const [isLoading,setIsLoading] = useState(false)
  const {setNotification,closeNotification} = useContext(notificationContext)
  //form inputs state
  const[contactInfo,setContactInfo] = useState({
    type:"",
    message:""
  })
  //handle form input's change 
  const handleChange = (event) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  //handle submit
  const sendMessage = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await emailjs.sendForm('service_zce6oq2','template_xs0rc8q',e.target,'pREPpjkuU35zUe2vI')
      //console.log(result)
      setNotification({isShown:true,message:"Message was sent successfully",color:"green"})
      closeNotification()
    } catch (error) {
      //console.log(error)
      setNotification({isShown:true,message:"Something went wrong",color:"red"})
      closeNotification()
    }
    setContactInfo({
      type:"",
      message:""
    })
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <Loading/>}
      <form onSubmit={sendMessage} className="form">
        <h1>Contact us</h1>
        <div className="form-container">
          <select
            defaultValue=""
            name="type"
            onChange={handleChange}
            required
          >
            <option value="" disabled >Message Type *</option>
            <option value="Suggestion">Suggestion</option>
            <option value="Problem">Problem</option>
            <option value="Bug">Bug</option>
          </select>
          <textarea
            placeholder="Your message"
            name="message"
            value={contactInfo.message}
            onChange={handleChange}
            maxLength="300"
            required
          />
          <input type="submit" value="Send"/>
        </div>
      </form>
    </>
  )
}

export default ContactUs