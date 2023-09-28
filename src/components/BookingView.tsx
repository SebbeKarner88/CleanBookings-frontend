import NavBar from "../common/NavBar"
import { useState, useEffect } from 'react'
import TypesOfCleaning from "../common/TypesOfCleaing"

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

    /* TODO: add logic with fetch for booking a service */

    return (
        <>
            <NavBar />
            <h1>BOOKING VIEW</h1>
            {isPicked ?
                <p>You want to book {choice}</p>
                :
                <TypesOfCleaning />
            }

            {/* TODO: add form for booking picked service */}
        </>
    )
}

export default BookingView