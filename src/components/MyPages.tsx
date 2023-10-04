import { Footer } from "../common/Footer"
import NavBar from "../common/NavBar"

function MyPages() {

    {/* TODO: logic to check if user is already logged in, if not, send to log in page */ }

    return (
        <>
            <NavBar />

            {/* 
            TODO: show the name of the person who's logged in?
            TODO: add the BookedCleanings component
            TODO: add the BookingHistory component */}
            <Footer />
        </>
    )
}

export default MyPages