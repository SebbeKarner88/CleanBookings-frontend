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
        // Add more dummy data entries as needed
    ];

    return (
        <div>
            <h1>Booked Cleanings</h1>
            <ul>
                {dummyData.map((booking) => (
                    <li key={booking.id}>
                        <p>Booking ID: {booking.id}</p>
                        <p>Date: {booking.bookedDate}</p>
                        <p>Service Type: {booking.type}</p>
                        <p>Customer: {booking.customer.firstName} {booking.customer.lastName}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookedCleanings;