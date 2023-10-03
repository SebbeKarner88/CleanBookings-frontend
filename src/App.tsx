import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from './components/LandingPage'
import MyPages from './components/MyPages'
import Services from './components/Services'
import Contact from './components/Contact'
import BookedCleanings from './components/BookingManagement/BookedCleanings';
import BookingHistory from "./components/BookingManagement/BookingHistory.tsx";
import BookingView from './components/BookingManagement/BookingView.tsx'
import LogIn from './components/LogIn.tsx'
import Register from './components/Register.tsx'
import AboutUs from './components/AboutUs'
import CancelCleaning from "./components/BookingManagement/CancelCleaning";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.tsx";
import ApprovedCleaning from "./components/BookingManagement/ApprovedCleaning";
import GDPRCustomerData from "./components/GDPRCustomerData.tsx";

function App() {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/myPages" element={isAuthenticated ? <MyPages /> : <LogIn/>} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booked-cleanings/:customerId" element={<BookedCleanings />} />
          <Route path="/booking-history/:customerId" element={<BookingHistory />} />
          <Route path="/gdpr-customer-data/:customerId" element={<GDPRCustomerData />} />
          <Route path="/booking-view" element={<BookingView />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Cancel-cleaning" element={<CancelCleaning />} />
          <Route path="/approved-cleaning/:cleaningId" element={<ApprovedCleaning />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App