import { useState } from 'react';
import { useParams } from 'react-router-dom';

function CancelCleaning() {
    const [showModal, setShowModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const { bookingId } = useParams<{ bookingId: string }>(); //Get the bookingId from the URL parameter

    const handleCancel = async () => {
        try {
            //The fetch for database.
            const response = await fetch('API', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId }),
            });

            if (response.ok) {
                setFeedbackMessage("Städningen har framgångsrikt avbokats."); //Message for successful booking.
            } else {
                const responseBody = await response.json();
                setFeedbackMessage(responseBody.message || "Ett fel inträffade vid avbokningen."); //Message for failed booking.
            }
        } catch (error) {
            console.error('Ett fel inträffade:', error);
            setFeedbackMessage("Ett oväntat fel inträffade. Försök igen senare."); //Message for unexpected error.
        }

        setShowModal(false); //After the cancellation process, hide the modal window.

    };

    return (
        <div>
            <button className="btn btn-danger" onClick={() => setShowModal(true)}>Avboka städning</button>
            {showModal && (  //If showModal is true, show the modal window.
                <div>
                    Är du säker på att du vill avboka?
                    <button className="btn btn-danger" onClick={handleCancel}>Ja</button>
                    <button className="btn btn-danger" onClick={() => setShowModal(false)}>Nej</button>
                </div>
            )}
            {feedbackMessage && <p>{feedbackMessage}</p>}  {/* Show feedback message*/}
        </div>
    );
}

export default CancelCleaning;
