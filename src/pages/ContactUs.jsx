import React,{useState} from 'react'
import emailjs from 'emailjs-com'

const ContactUs = () => {
  //form inputs state
  const[contactInfo,setContactInfo] = useState({
    type:"",
    message:""
  })
  //handle form input's change 
  const handleChange = (event) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  //controlled vs uncontrolled?????
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    emailjs.sendForm('service_zce6oq2','template_xs0rc8q',e.target,'pREPpjkuU35zUe2vI')
    .then((result)=>{
      console.log(result)
    }
    ,(error)=>{
      console.log(error)
    });
    e.target.reset()
    setContactInfo({
      type:"",
      message:""
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h1>Contact us</h1>
        <div className="form-container">
          <select
            defaultValue=""
            name="type"
            onChange={handleChange}
            required
          >
            <option value="" disabled >Message Type</option>
            <option value="suggestion">Suggestion</option>
            <option value="problem">Problem</option>
            <option value="bug">Bug</option>
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