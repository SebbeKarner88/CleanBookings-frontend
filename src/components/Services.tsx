import { Button } from "react-bootstrap";
import NavBar from "../common/NavBar";
import TypesOfCleaning from "../common/TypesOfCleaning";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Services() {
    const { isAuthenticated } = useContext(AuthContext)
    const navigation = useNavigate()

    const handleBook = () => {

        if (isAuthenticated)
            navigation("/booking-view");
        else
            navigation("/login");
    }

    return (
        <>
            <NavBar />
            <h1>What We Offer</h1>
            <TypesOfCleaning />
            <Button
                id="book"
                variant="outline-dark"
                onClick={() => handleBook()}>Book Now</Button>
        </>
    );
}

export default Services;
