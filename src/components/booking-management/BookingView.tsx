import NavBar from "../../common/NavBar.tsx"
import BookingForm from "../forms/FormBookService"
import { Footer } from "../../common/Footer.tsx";
import {useLocation} from "react-router-dom";

export default function BookingView() {
    const location = useLocation();

    return (
        <div className="min-vw-100 min-vh-100 bg-image">
            <NavBar />
            <h1 className="text-md-center fw-bold my-4 text-white">
                Boka en städning
            </h1>
            <div className="bg-light-brown container p-2 p-md-4 my-4 mb-5 rounded rounded-4">
                <div className="container text-start">
                    <BookingForm selectedService={location.state.type}/>
                </div>
            </div>
            <Footer />
        </div>
    )
}