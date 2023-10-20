import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import MyPages from './components/MyPages'
import ServicesView from './components/services-view/ServicesView.tsx'
import Contact from './components/Contact'
import BookedCleanings from './components/booking-management/BookedCleanings';
import CleaningsPerType from './components/booking-management/CleaningsPerType';
import BookingHistory from "./components/booking-management/BookingHistory.tsx";
import BookingView from './components/booking-management/BookingView.tsx'
import LogIn from './components/LogIn.tsx'
import Register from './components/Register.tsx'
import AboutUs from './components/AboutUs'
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.tsx";
import SettingsView from "./components/SettingsView.tsx";
import EditCustomerDataView from './components/EditCustomerDataView.tsx'
import NotFoundView from "./components/NotFoundView.tsx";
import FAQ from "./components/FAQ.tsx";

function App() {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/services" element={<ServicesView />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/*" element={<NotFoundView />} />
          {
            isAuthenticated &&
              <>
                <Route path="/my-pages" element={<MyPages />} />
                <Route path="/my-pages/settings" element={<SettingsView />} />
                <Route path="/booked-cleanings/:customerId" element={<BookedCleanings />} />
                <Route path="/cleanings-per-type" element={<CleaningsPerType />} />
                <Route path="/booking-history/:customerId" element={<BookingHistory />} />
                <Route path="/booking-view" element={<BookingView />} />
                <Route path="/update-customer" element={<EditCustomerDataView />} />
                {/*<Route path="/approved-cleaning/:cleaningId" element={<ApprovedCleaning />} />*/}
                {/*<Route path="/disapproved-cleaning/:cleaningId" element={<DisapprovedCleaning />} />*/}
              </>
          }
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App