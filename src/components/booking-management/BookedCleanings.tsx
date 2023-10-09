import React, { useEffect, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import MyModal from "../../common/MyModal";

const BookedCleanings: React.FC = () => {
    const { customerId } = useContext(AuthContext);
    // const { customerId } = useParams<{ customerId: string }>();
    const [bookedCleanings, setBookedCleanings] = useState<JobDto[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

    const handleCancelCleaning = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setShowModal(true);
    };

    const confirmCancellation = async () => {
        if (selectedBookingId) {
            try {
                const requestBody = {
                    jobId: selectedBookingId,
                    userId: customerId
                };

                const response = await fetch(`http://localhost:8080/api/v1/job`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });

                if (response.ok) {
                    setBookedCleanings(prevCleanings =>
                        prevCleanings.filter(clean => clean.id !== selectedBookingId)
                    );
                } else {
                    console.error("Ett fel inträffade vid avbokningen");
                }
            } catch (error) {
                console.error('Ett fel inträffade:', error);
            }

            setShowModal(false);
            setSelectedBookingId(null);
        }
    };

    useEffect(() => {
        if (!customerId) {
            return; // Ensure customerId is available
        }

        axios.get(`http://localhost:8080/api/v1/job/booked-cleanings/${customerId}`)
            .then((response) => {
                setBookedCleanings(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [customerId]);

    /* TODO: This effect must be moved elsewhere because here we have only booked cleanings */

    return (
        <div className="container mt-4">
            <h1 className="text-center">Booked Cleanings for Customer <br/> ID: {customerId}</h1>
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
                                <button onClick={() => handleCancelCleaning(booking.id)}>Cancel</button>
                            </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <MyModal
                header="Avboka Städning"
                description="Är du säker på att du vill avboka städningen?"
                modalVisible={showModal}
                onRequestClose={() => setShowModal(false)}
                onConfirm={confirmCancellation}
            />
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

