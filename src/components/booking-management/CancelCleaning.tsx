import { useState } from 'react';
import { useParams } from 'react-router-dom';

function CancelCleaning() {
    const [showModal, setShowModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const { bookingId } = useParams<{ bookingId: string }>();

    const handleCancel = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/job/', {
                method: 'DELETE',  // Modified HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId }),
            });

            if (response.ok) {
                setFeedbackMessage("Städningen har framgångsrikt avbokats.");
            } else {
                const responseBody = await response.json();
                setFeedbackMessage(responseBody.message || "Ett fel inträffade vid avbokningen.");
            }
        } catch (error) {
            console.error('Ett fel inträffade:', error);
            setFeedbackMessage("Ett oväntat fel inträffade. Försök igen senare.");
        }

        setShowModal(false);
    };

    return (
        <div>
            <button className="btn btn-danger" onClick={() => setShowModal(true)}>Avboka städning</button>
            {showModal && (
                <div>
                    Är du säker på att du vill avboka?
                    <button className="btn btn-danger" onClick={handleCancel}>Ja</button>
                    <button className="btn btn-danger" onClick={() => setShowModal(false)}>Nej</button>
                </div>
            )}
            {feedbackMessage && <p>{feedbackMessage}</p>}
        </div>
    );
}

export default CancelCleaning;
