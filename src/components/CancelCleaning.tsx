import React, { useState } from 'react';

function CancelCleaning() {
    const [showModal, setShowModal] = useState(false);

    const handleCancel = async () => {

        try {
          const response = await fetch('api', { method: 'POST' });
          if (response.ok) {
              //Manage successful cancellation here, e.g. message to the user.
          } else {
              //Handle cancellation errors here, e.g. display an error message.
          }
        } catch (error) {
          console.error('Ett fel inträffade:', error);
          //Handle unexpected errors here, e.g. display an error message.
        }

        setShowModal(false);
        //After the cancellation process, hide the modal window.
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Avboka städning</button>
            {showModal && (
                //If showModal is true, show the modal window.
                <div>
                    Är du säker på att du vill avboka?
                    <button onClick={handleCancel}>Ja</button>
                    <button onClick={() => setShowModal(false)}>Nej</button>
                </div>
            )}
        </div>
    );
}

export default CancelCleaning;
