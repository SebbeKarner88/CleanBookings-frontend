import NavBar from "../../common/NavBar.tsx"
import TypesOfCleaning from "../ServicesView/TypesOfCleaning.tsx"
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