import NavBar from "../../common/NavBar"
import TypesOfCleaning from "../../common/TypesOfCleaning"
import BookingForm from "../forms/FormBookService"

const BookingView = () => {

    return (
        <>
            <NavBar />
            <h1>BOOKING VIEW</h1>
            <TypesOfCleaning />
            <BookingForm />
        </>
    )
}

export default BookingView