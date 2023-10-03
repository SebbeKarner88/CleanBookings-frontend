import NavBar from "../../common/NavBar"
import { useState, useEffect } from 'react'
import TypesOfCleaning from "../../common/TypesOfCleaing"
import BookingForm from "../forms/FormBookService"

const BookingView = () => {
    const [ isPicked, setIsPicked ] = useState(false)
    const choice = sessionStorage.getItem('choice')

    useEffect(() => {
        const checkIfChoice = () => {
            if (choice !== null) {
                setIsPicked(true)
            }
        }

        const interval = setInterval(() => {
            checkIfChoice()
        }, 1000)

        checkIfChoice()

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <NavBar />
            <h1>BOOKING VIEW</h1>
            {isPicked ?
                <p>You want to book {choice}</p> /* TODO: add possibility to change picked service and to bring the choice to the form */
                :
                <TypesOfCleaning />
            }

            {/* form for booking picked service */}
            {isPicked ?
                <BookingForm choice={choice}/>
                : null
            }
        </>
    )
}

export default BookingView