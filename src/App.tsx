import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import LandingPage from './components/LandingPage'
import MyPages from './components/MyPages'
import Services from './components/Services'
import Contact from './components/Contact'
import BookedCleanings from './components/BookedCleanings';
import CancelCleaning from "./components/CancelCleaning";

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
          <Route path="/cancel-cleaning" element={<CancelCleaning />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App