import { Button } from "react-bootstrap";
import NavBar from "../../common/NavBar.tsx";
import TypesOfCleaning from "./TypesOfCleaning.tsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../common/Footer.tsx";
import '../../styles/ServicesView.css'

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
            <div className="bg-image min-vw-100 py-4 text-start text-center">
                <h1 className="fw-bold my-4 mx-2 text-center text-white">Våra tjänster</h1>
                <TypesOfCleaning />
                <Button
                    id="book"
                    className="bookButton"
                    onClick={() => handleBook()}>Boka städning</Button>
            </div>
            <Footer />
        </>
    );
}

export default ServicesView;
