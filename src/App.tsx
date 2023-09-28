import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from './components/LandingPage'
import MyPages from './components/MyPages'
import Services from './components/Services'
import Contact from './components/Contact'
import BookedCleanings from './components/BookedCleanings';
import BookingHistory from "./components/BookingHistory.tsx";
import GDPRInfo from "./components/GDPRInfo.tsx";
import BookingView from './components/BookingView.tsx'
import LogIn from './components/LogIn.tsx'
import Register from './components/Register.tsx'
import AboutUs from './components/AboutUs'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/myPages" element={<MyPages />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booked-cleanings" element={<BookedCleanings />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/gdpr-info" element={<GDPRInfo />} />
          <Route path="/booking-view" element={<BookingView />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App