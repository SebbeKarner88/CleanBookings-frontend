import NavBar from "../../common/NavBar.tsx"
import BookingForm from "../forms/FormBookService"
import {Footer} from "../../common/Footer.tsx";

export default function BookingView() {

    return (
        <div className="bg-light-brown min-vh-100 min-vw-100">
            <NavBar />
            <div className="container text-start flex-grow-1">
            <h1 className="text-md-center fw-semibold my-3 text-dark-purple">
                Boka en städning
            </h1>
            <BookingForm />

            </div>
            <Footer/>
        </div>
    )
}