import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from './components/LandingPage'
import MyPages from './components/MyPages'
import Services from './components/Services'
import Contact from './components/Contact'
import BookedCleanings from './components/booking-management/BookedCleanings';
import CleaningsPerType from './components/booking-management/CleaningsPerType';
import BookingHistory from "./components/booking-management/BookingHistory.tsx";
import BookingView from './components/booking-management/BookingView.tsx'
import LogIn from './components/LogIn.tsx'
import Register from './components/Register.tsx'
import AboutUs from './components/AboutUs'
import CancelCleaning from "./components/booking-management/CancelCleaning";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.tsx";
import ApprovedCleaning from "./components/booking-management/ApprovedCleaning";
import DisapprovedCleaning from "./components/booking-management/DisapprovedCleaning";
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
          <Route path="/cleanings-per-type" element={<CleaningsPerType />} />
          <Route path="/booking-history/:customerId" element={<BookingHistory />} />
          <Route path="/gdpr-customer-data/:customerId" element={<GDPRCustomerData />} />
          <Route path="/booking-view" element={<BookingView />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Cancel-cleaning" element={<CancelCleaning />} />
          <Route path="/approved-cleaning/:cleaningId" element={<ApprovedCleaning />} />
          <Route path="/disapproved-cleaning/:cleaningId" element={<DisapprovedCleaning />} />
        </Routes>
      </BrowserRouter> 
    </>

  )
}

export default App