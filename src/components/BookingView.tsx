import NavBar from "../common/NavBar"

const BookingView = () => {

    const choice = sessionStorage.getItem('choice')
    /* TODO: add logic for booking a service */

    return (
        <>
        <NavBar />
        <h1>BOOKING VIEW</h1>
        <p>You want to book {choice}</p>
        </>
    )
}

export default BookingView