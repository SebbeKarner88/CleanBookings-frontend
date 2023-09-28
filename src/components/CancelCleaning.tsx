import React, { useState } from 'react';

function CancelCleaning() {
    const [showModal, setShowModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleCancel = async () => {

        try {
          const response = await fetch('api', { method: 'POST' });
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
            <button onClick={() => setShowModal(true)}>Avboka städning</button>
            {showModal && (  //If showModal is true, show the modal window.
                <div>
                    Är du säker på att du vill avboka?
                    <button onClick={handleCancel}>Ja</button>
                    <button onClick={() => setShowModal(false)}>Nej</button>
                </div>
            )}
            {feedbackMessage && <p>{feedbackMessage}</p>}  {/* Show feedback message*/}
        </div>
    );
}

export default CancelCleaning;
