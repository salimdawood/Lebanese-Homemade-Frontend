import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from './pages/ContactUs';
import Error from './pages/Error'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <Navbar/>
        </nav>
        <main>
          <Routes>
              <Route index element={<Home />}/>
              <Route path="/contactus" element={<ContactUs />}/>
              <Route path="/signin" element={<SignIn />}/>
              <Route path="/signup" element={<SignUp />}/>
              <Route path="/*" element={<Error />}/>
            </Routes>
        </main>
        <footer>
          <Footer/>
        </footer>
      </div>
    </Router>
  );
}

export default App;
