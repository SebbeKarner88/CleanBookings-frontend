
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const BookingHistory: React.FC = () => {
    const { customerId } = useContext(AuthContext);
    const [bookingHistory, setBookingHistory] = useState<JobDto[]>([]);

    // Dummy data for the customer (replace with your data structure)
    // const customer = {
    //     id: customerId,
    //     firstName: 'John',
    //     lastName: 'Doe',
    // };

    useEffect(() => {
        if (!customerId) {
            return; // Ensure customerId is available
        }

        axios.get(`http://localhost:8080/api/v1/job/booking-history/${customerId}`)
            .then((response) => {
                setBookingHistory(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [customerId]);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Booking History for Customer <br/> ID: {customerId}</h1>
            {/*<h2 className="text-center">Customer: {customer.firstName} {customer.lastName}</h2>*/}
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
                {bookingHistory.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        {/*<td>{booking.bookedDate}</td>*/}
                        <td>{new Date(booking.bookedDate).toLocaleDateString()}</td>
                        <td>{booking.type}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingHistory;

interface JobDto {
    id: string;
    bookedDate: string; // You may need to format this date appropriately
    type: string;
    message: string;
    status: string;
}