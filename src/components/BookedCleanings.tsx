import React from 'react';

const BookedCleanings: React.FC = () => {
    // Component logic here
    // Dummy data for booked cleanings (replace with your data structure)
    const dummyData = [
        {
            id: '1',
            bookedDate: '2023-09-20',
            type: 'Basic Cleaning',
            customer: {
                firstName: 'John',
                lastName: 'Doe',
            },
        },
        {
            id: '2',
            bookedDate: '2023-09-21',
            type: 'Top Cleaning',
            customer: {
                firstName: 'Jane',
                lastName: 'Smith',
            },
        },
        {
            id: '3',
            bookedDate: '2023-09-22',
            type: 'Diamond Cleaning',
            customer: {
                firstName: 'Alice',
                lastName: 'Johnson',
            },
        },
        {
            id: '4',
            bookedDate: '2023-09-23',
            type: 'Window Washing',
            customer: {
                firstName: 'Bob',
                lastName: 'Williams',
            },
        },
        {
            id: '5',
            bookedDate: '2023-09-24',
            type: 'Basic Cleaning',
            customer: {
                firstName: 'Eva',
                lastName: 'Brown',
            },
        },
        // Add more dummy data entries as needed
    ];

    // Function to handle canceling a booking
    const handleCancelBooking = (bookingId: string) => {
        // Implement cancel booking logic here (e.g., make an API request)
        console.log(`Canceled booking with ID: ${bookingId}`);
    };

    return (
        <div>
            <h1>Booked Cleanings</h1>
            {/*<ul>*/}
            {/*    {dummyData.map((booking) => (*/}
            {/*        <li key={booking.id}>*/}
            {/*            <p>Booking ID: {booking.id}</p>*/}
            {/*            <p>Date: {booking.bookedDate}</p>*/}
            {/*            <p>Service Type: {booking.type}</p>*/}
            {/*            <p>Customer: {booking.customer.firstName} {booking.customer.lastName}</p>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}

            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Service Type</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {dummyData.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.bookedDate}</td>
                        <td>{booking.type}</td>
                        <td>{booking.customer.firstName} {booking.customer.lastName}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleCancelBooking(booking.id)}>
                                Cancel
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookedCleanings;