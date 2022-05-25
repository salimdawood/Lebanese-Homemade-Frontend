import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ContactUs from './pages/ContactUs';
import Error from './pages/Error'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import RequireAuth from './components/RequireAuth'
import UserDashboard from './pages/UserDashboard'
import {UserContextProvider} from './context/userContext'

function App() {
  
  return (
    <Router>
      <UserContextProvider>
        <div className="app-container">
          <nav>
            <Navbar/>
          </nav>
          <main>
            <Routes>
                <Route element={<RequireAuth/>}>
                  <Route path="/user/:userName" element={<UserDashboard />}/>
                </Route>
                <Route path="/contactus" element={<ContactUs />}/>
                <Route path="/signin" element={<SignIn />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/aboutus" element={<AboutUs />}/>
                <Route index element={<Home />}/>
                <Route path="/*" element={<Error />}/>
              </Routes>
          </main>
          <footer>
            <Footer/>
          </footer>
        </div>
      </UserContextProvider>
    </Router>
  );
}

export default App;
