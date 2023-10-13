import { Footer } from "../common/Footer"
import NavBar from "../common/NavBar"
import { useContext, useEffect } from 'react';
import BookingHistory from '../components/booking-management/BookingHistory';
import { AuthContext } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom';
import CleaningsPerType from "./booking-management/CleaningsPerType.tsx";
import { Button } from "react-bootstrap";


function MyPages() {

    const { isAuthenticated, name } = useContext(AuthContext);
    const navigate = useNavigate ();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('Login');
        }
    }, [isAuthenticated, navigate]);

    const handleOnClick = () => {
        navigate("/gdpr-customer-data")
    }


    {/* TODO: logic to check if user is already logged in, if not, send to log in page */ }

    return (
        <>
            <NavBar />
            <div className="container">
                <h1>Hejsan {name}!</h1>
                <Button variant="primary"
                onClick={handleOnClick}>Inställningar</Button>
                <h2>Dina Bokningar</h2>
                <CleaningsPerType />
                <h2>Dina stängda bokningar</h2>
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