import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisapprovedCleaning: React.FC = () => {
    // States
    const [completedCleanings, setCompletedCleanings] = useState<JobDto[]>([]); //Duplicate in ApprovedCleaning.tsx, need parent component.
    const [showDisapprovalModal, setShowDisapprovalModal] = useState(false);
    const [disapprovalFeedback, setDisapprovalFeedback] = useState('');
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

    const disapproveCleaning = () => {
        if (selectedCleaning) {
            axios.put(`http://localhost:8080/api/v1/job/disapprove-cleaning/${selectedCleaning.id}`, {
                feedback: disapprovalFeedback
            })
                .then(() => {
                    setCompletedCleanings(prev => prev.filter(cleaning => cleaning.id !== selectedCleaning.id));
                    setShowDisapprovalModal(false);
                    setDisapprovalFeedback('');
                    setSelectedCleaning(null);
                })
                .catch((error) => {
                    console.error("Error disapproving cleaning:", error);
                    setError('There was an error disapproving the cleaning.');
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
                    <th scope="col">Actions</th>
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
                                setShowDisapprovalModal(true);
                            }}>Disapprove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showDisapprovalModal && selectedCleaning && (
                <div className="modal">
                    <h2>Disapprove Cleaning for {selectedCleaning.id}</h2>
                    <textarea value={disapprovalFeedback} onChange={(e) => setDisapprovalFeedback(e.target.value)} placeholder="Enter disapproval feedback..."></textarea>
                    <button disabled={disapprovalFeedback.length === 0 || disapprovalFeedback.length > 1000} onClick={disapproveCleaning}>Submit Feedback</button>
                    <button onClick={() => setShowDisapprovalModal(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default DisapprovedCleaning;

interface JobDto {
    id: string;
    bookedDate: string;
    type: string;
    message: string;
    status: string;
}
