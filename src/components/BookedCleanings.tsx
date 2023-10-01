
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookedCleanings: React.FC = () => {
    const { customerId } = useParams<{ customerId: string }>();
    const [bookedCleanings, setBookedCleanings] = useState<JobDto[]>([]);

    useEffect(() => {

        axios.get(`http://localhost:8080/api/v1/job/booked-cleanings/${customerId}`)
            .then((response) => {
                setBookedCleanings(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [customerId]);

    return (
        <div className="container mt-4">
            <h1 className="text-center">Booked Cleanings for Customer {customerId}</h1>
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
                {bookedCleanings.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{new Date(booking.bookedDate).toLocaleDateString()}</td>
                        <td>{booking.type}</td>
                            <td>
                                <Link to={`/Cancel-cleaning/${booking.id}`}>Cancel</Link>
                            </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookedCleanings;

interface JobDto {
    id: string;
    bookedDate: string; // You may need to format this date appropriately
    type: string;
    message: string;
    status: string;
}

