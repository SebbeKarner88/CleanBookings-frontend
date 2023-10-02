// import React from 'react';
//
// const BookingHistory: React.FC = () => {
//     // Component logic here
//
//     return (
//         <div>
//             <h1>Booking History</h1>
//             {/* JSX for displaying booking history information */}
//         </div>
//     );
// };
//
// export default BookingHistory;

import React from 'react';
import { useParams } from 'react-router-dom';

const BookingHistory: React.FC = () => {
    // Get the 'customerId' from the route parameters
    const { customerId } = useParams<{ customerId: string }>();

    // Dummy data for the customer (replace with your data structure)
    const customer = {
        id: customerId,
        firstName: 'John',
        lastName: 'Doe',
    };

    // Dummy data for booking history (replace with your data structure)
    const dummyData = [
        {
            id: '1',
            bookedDate: '2023-09-15',
            type: 'Basic Cleaning',
        },
        {
            id: '2',
            bookedDate: '2023-09-16',
            type: 'Top Cleaning',
        },
        {
            id: '3',
            bookedDate: '2023-09-17',
            type: 'Diamond Cleaning',
        },
        {
            id: '4',
            bookedDate: '2023-09-18',
            type: 'Window Washing',
        },
        {
            id: '5',
            bookedDate: '2023-09-19',
            type: 'Basic Cleaning',
        },
        {
            id: '6',
            bookedDate: '2023-09-20',
            type: 'Top Cleaning',
        },
        {
            id: '7',
            bookedDate: '2023-09-21',
            type: 'Diamond Cleaning',
        },
        // Add more dummy data entries as needed
    ];

    // // Function to handle viewing more info about a booking
    // const handleViewInfo = (bookingId: string) => {
    //     // Implement the logic to view more info about the booking (e.g., open a modal)
    //     console.log(`View info for booking with ID: ${bookingId}`);
    // };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Booking History for Customer ID: {customerId}</h1>
            <h2 className="text-center">Customer: {customer.firstName} {customer.lastName}</h2>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Booking ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Service Type</th>
                    {/*<th scope="col">Action</th>*/}
                </tr>
                </thead>
                <tbody>
                {dummyData.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.bookedDate}</td>
                        <td>{booking.type}</td>
                        {/*<td>*/}
                        {/*    <button className="btn btn-info" onClick={() => handleViewInfo(booking.id)}>*/}
                        {/*        Info*/}
                        {/*    </button>*/}
                        {/*</td>*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingHistory;