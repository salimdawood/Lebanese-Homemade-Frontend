import './App.css';
import {useEffect,useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//components
import RequireAuth from './components/RequireAuth'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
//pages
import UserCards from './pages/UserCards'
import UserDashboard from './pages/UserDashboard'
import UpdateCardPage from './pages/UpdateCardPage'
import AddCardPage from './pages/AddCardPage'
import Error from './pages/Error'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
//context
import {UserContextProvider} from './context/userContext'
import {CardContextProvider} from './context/cardContext'
import {NotificationContextProvider} from './context/notificationContext'
//model
import MenuModel from './model/MenuModel'
import PhotoModel from './model/PhotoModel'
import NotificationModel from './model/NotificationModel'
//api
import * as Axios from 'axios'
import {URL_PATH} from './constantVariables/path'

function App() {

  const [types,setTypes] = useState([])
  useEffect(async() => {
    try {
      const result = await Axios.get(URL_PATH+'Types/')
      setTypes([...result.data])
    } catch (error) {
      console.log(error)
    }
  }, [])
  
  
  return (
    <Router>
      <UserContextProvider>
        <CardContextProvider>
          <NotificationContextProvider>
            <div className="app-container">
              <nav>
                <Navbar/>
              </nav>
              <main>
                <Routes>
                    <Route element={<RequireAuth/>}>
                      <Route path="/user/:userId/cards" element={<UpdateCardPage types={types} />}/>
                      <Route path="/user/:userId/add-card" element={<AddCardPage types={types} />}/>
                      <Route path="/user/:userId" element={<UserDashboard />}/>
                    </Route>
                    <Route path="/:username/cards" element={<UserCards />}/>
                    <Route path="/contactus" element={<ContactUs />}/>
                    <Route path="/signin" element={<SignIn />}/>
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/aboutus" element={<AboutUs />}/>
                    <Route index element={<Home types={types} />}/>
                    <Route path="/*" element={<Error />}/>
                  </Routes>
              </main>
              <footer>
                <Footer/>
              </footer>
            </div>
            <PhotoModel/>
            <MenuModel/>
            <NotificationModel/>
          </NotificationContextProvider>
        </CardContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export default App;
