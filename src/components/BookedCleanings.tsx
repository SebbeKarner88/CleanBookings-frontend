
import React from 'react';
import {Link, useParams} from 'react-router-dom';

const BookedCleanings: React.FC = () => {
    // Get the 'customerId' from the route parameters
    const { customerId } = useParams<{ customerId: string }>();

    // Dummy data for the customer
    const customer = {
        id: customerId,
        firstName: 'John',
        lastName: 'Doe',
    };

    // Dummy data for booked cleanings
    const dummyBookedCleanings = [
        {
            id: '1',
            bookedDate: '2023-09-20',
            type: 'Basic Cleaning',
        },
        {
            id: '2',
            bookedDate: '2023-09-21',
            type: 'Top Cleaning',
        },
        {
            id: '3',
            bookedDate: '2023-09-22',
            type: 'Diamond Cleaning',
        },
        {
            id: '4',
            bookedDate: '2023-09-23',
            type: 'Window Washing',
        },
        // Add more dummy data entries as needed
    ];

    // Function to handle canceling a booking
    // const handleCancelBooking = (bookingId: string) => {
    //     // Implement cancel booking logic here (e.g., make an API request)
    //     console.log(`Canceled booking with ID: ${bookingId}`);
    // };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Booked Cleanings for Customer {customerId}</h1>
            <h2 className="text-center">Customer: {customer.firstName} {customer.lastName}</h2>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Service Type</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {dummyBookedCleanings.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.bookedDate}</td>
                        <td>{booking.type}</td>
                        {/*<td>*/}
                        {/*    <button className="btn btn-danger" onClick={() => handleCancelBooking(booking.id)}>*/}
                        {/*        Cancel*/}
                        {/*    </button>*/}
                        {/*</td>*/}
                        <td>
                            {/*<Link to={`/Cancel-cleaning/${booking.id}`}>Cancel</Link>*/}
                            <Link to={`/Cancel-cleaning`}>Cancel</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookedCleanings;