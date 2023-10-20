import { Button } from "react-bootstrap";
import NavBar from "../../common/NavBar.tsx";
import TypesOfCleaning from "../../common/TypesOfCleaning.tsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../common/Footer.tsx";

function ServicesView() {
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
            <div
                className="cardContainer">
            <h1>What We Offer</h1>
            <TypesOfCleaning />
            <Button
                id="book"
                variant="outline-dark"
                onClick={() => handleBook()}>Book Now</Button>
            </div>
            <Footer />
        </>
    );
}

export default ServicesView;
