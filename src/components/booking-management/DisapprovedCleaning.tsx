import React, { useState } from 'react';
import { disapproveCleaning } from "../../api/jobApi";

interface Props {
    completedCleanings: JobDto[];
    setCompletedCleanings: React.Dispatch<React.SetStateAction<JobDto[]>>;
}

const DisapprovedCleaning: React.FC<Props> = ({ completedCleanings, setCompletedCleanings }) => {
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [selectedCleaning, setSelectedCleaning] = useState<JobDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDisapproveCleaning = () => {
        if (selectedCleaning) {
            disapproveCleaning(selectedCleaning.id, feedback)
                .then(() => {
                    setCompletedCleanings(prev => prev.filter(cleaning => cleaning.id !== selectedCleaning.id));
                    setShowModal(false);
                    setFeedback('');
                    setSelectedCleaning(null);
                })
                .catch((error) => {
                    console.error("Error disapproving cleaning:", error);
                    setError('There was an error disapproving the cleaning.');
                });
        }
    };

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
                            }}>Disapprove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showModal && selectedCleaning && (
                <div className="modal">
                    <h2>Disapprove Cleaning for {selectedCleaning.id}</h2>
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Enter negative feedback..."></textarea>
                    <button disabled={feedback.length === 0 || feedback.length > 1000} onClick={handleDisapproveCleaning}>Submit Feedback</button>
                    <button onClick={() => setShowModal(false)}>Close</button>
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
