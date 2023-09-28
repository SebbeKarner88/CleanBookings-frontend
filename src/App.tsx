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


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/myPages" element={<MyPages />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booked-cleanings" Component={BookedCleanings} />
          <Route path="/booking-history" Component={BookingHistory} />
          <Route path="/gdpr-info" Component={GDPRInfo} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App