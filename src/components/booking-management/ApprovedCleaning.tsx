import React, { useEffect, useState } from 'react';
import axios from 'axios';

//React functional component for displaying and handling approved cleanings.
const ApprovedCleaning: React.FC = () => {
    // States
    const [completedCleanings, setCompletedCleanings] = useState<JobDto[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [selectedCleaning, setSelectedCleaning] = useState<JobDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetching data
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/job/completed-cleanings')
            .then((response) => {
                setCompletedCleanings(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError('There was an error fetching the data.');
            });
    }, []);

    const approveCleaning = () => {
        if (selectedCleaning) {
            axios.put(`http://localhost:8080/api/v1/job/approve-cleaning/${selectedCleaning.id}`, {
                feedback: feedback
            })
                .then(() => {
                    setCompletedCleanings(prev => prev.filter(cleaning => cleaning.id !== selectedCleaning.id));
                    setShowModal(false);
                    setFeedback('');
                    setSelectedCleaning(null);
                })
                .catch((error) => {
                    console.error("Error approving cleaning:", error);
                    setError('There was an error approving the cleaning.');
                });
        }
    };

    // Rendering
    return (
        <div className="container mt-4">
            <h1 className="text-center">Completed Cleanings</h1>
            {error && <p className="alert alert-danger">{error}</p>}
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
                {completedCleanings.map((cleaning) => (
                    <tr key={cleaning.id}>
                        <td>{cleaning.id}</td>
                        <td>{new Date(cleaning.bookedDate).toLocaleDateString()}</td>
                        <td>{cleaning.type}</td>
                        <td>
                            <button onClick={() => {
                                setSelectedCleaning(cleaning);
                                setShowModal(true);
                            }}>Approve</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showModal && selectedCleaning && (
                <div className="modal">
                    <h2>Approve Cleaning for {selectedCleaning.id}</h2>
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Enter positive feedback..."></textarea>
                    <button disabled={feedback.length === 0 || feedback.length > 1000} onClick={approveCleaning}>Submit Feedback</button>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default ApprovedCleaning;

interface JobDto {
    id: string;
    bookedDate: string;
    type: string;
    message: string;
    status: string;
}
