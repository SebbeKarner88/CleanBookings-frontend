import { Footer } from "../common/Footer"
import NavBar from "../common/NavBar"
import { useContext, useEffect } from 'react';
import BookingHistory from '../components/booking-management/BookingHistory';
import BookedCleanings from '../components/booking-management/BookedCleanings';
import GDPRCustomerData from './GDPRCustomerData';
import { AuthContext } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom';

function MyPages() {

    const { isAuthenticated, name } = useContext(AuthContext);
    const navigate = useNavigate ();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('Login');
        }
    }, [isAuthenticated, navigate]);



    {/* TODO: logic to check if user is already logged in, if not, send to log in page */ }

    return (
        <>
            <NavBar />
            <div className="container">
                <h1>Hejsan,{name}</h1>
                <h2>Din personliga information</h2>
                <GDPRCustomerData />
                <h2>Dina bokningar</h2>
                <BookedCleanings />
                <h2>Din bokningshistorik</h2>
                <BookingHistory />
                </div>

            {/* 
            TODO: show the name of the person who's logged in?
            TODO: add the BookedCleanings component
            TODO: add the BookingHistory component */}
            <Footer />
        </>
    )
}

export default MyPages