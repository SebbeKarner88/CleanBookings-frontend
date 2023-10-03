// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import CustomerDataResponse from '../dto/CustomerDataResponse';
// import { Button, Modal } from 'react-bootstrap';
//
//
// const GDPRCustomerData: React.FC = () => {
//     const [customerData, setCustomerData] = useState<CustomerDataResponse | null>(null);
//     const [showPrivacyModal, setShowPrivacyModal] = useState(false);
//     const { customerId } = useParams<{ customerId: string }>();
//     const [privacyPolicyText, setPrivacyPolicyText] = useState<string>(''); // State to store the Privacy Policy text
//
//
//     useEffect(() => {
//         // Fetch customer data from the backend
//         axios.get(`http://localhost:8080/api/v1/gdpr/customer-data/${customerId}`)
//             .then((response) => {
//                 const data: CustomerDataResponse = response.data;
//                 setCustomerData(data);
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 // Handle errors here (e.g., show an error message)
//             });
//
//         // Fetch Privacy Policy text from the file
//         fetch('/privacy-policy.txt')
//             .then((response) => response.text())
//             .then((text) => setPrivacyPolicyText(text))
//             .catch((error) => {
//                 console.error('Error fetching Privacy Policy text:', error);
//                 // Handle errors here (e.g., show an error message)
//             });
//     }, [customerId]);
//
//     const handleClosePrivacyModal = () => {
//         setShowPrivacyModal(false);
//     };
//
//     const handleShowPrivacyModal = () => {
//         setShowPrivacyModal(true);
//     };
//
//     return (
//         <div>
//             <h2>Customer Data</h2>
//             {customerData ? (
//                 <div>
//                     <p><strong>Customer Id:</strong> {customerData.id}</p>
//                     <p><strong>First Name:</strong> {customerData.firstName}</p>
//                     <p><strong>Last Name:</strong> {customerData.lastName}</p>
//                     <p><strong>Customer Type:</strong> {customerData.customerType}</p>
//                     <p><strong>Street Address:</strong> {customerData.streetAddress}</p>
//                     <p><strong>Postal Code:</strong> {customerData.postalCode}</p>
//                     <p><strong>City:</strong> {customerData.city}</p>
//                     <p><strong>Phone Number:</strong> {customerData.phoneNumber}</p>
//                     <p><strong>Email Address:</strong> {customerData.emailAddress}</p>
//                 </div>
//             ) : (
//                 <p>Loading customer data...</p>
//             )}
//
//             <Button variant="primary" onClick={handleShowPrivacyModal}>
//                 Privacy Policy
//             </Button>
//
//             {/* Privacy Policy Modal */}
//             <Modal show={showPrivacyModal} onHide={handleClosePrivacyModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Privacy Policy</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {/* Display the Privacy Policy text from the state */}
//                     <pre>{privacyPolicyText}</pre>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClosePrivacyModal}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//
//         </div>
//     );
// };
//
// export default GDPRCustomerData;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomerDataResponse from '../dto/CustomerDataResponse';
import { Button, Modal } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

const GDPRCustomerData: React.FC = () => {
    const [customerData, setCustomerData] = useState<CustomerDataResponse | null>(null);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const { customerId } = useParams<{ customerId: string }>();
    const [privacyPolicyText, setPrivacyPolicyText] = useState<string>(''); // State to store the Privacy Policy text

    useEffect(() => {
        // Fetch customer data from the backend
        axios.get(`http://localhost:8080/api/v1/gdpr/customer-data/${customerId}`)
            .then((response) => {
                const data: CustomerDataResponse = response.data;
                setCustomerData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors here (e.g., show an error message)
            });

        // Fetch Privacy Policy text from the file
        fetch('/privacy-policy.txt')
            .then((response) => response.text())
            .then((text) => setPrivacyPolicyText(text))
            .catch((error) => {
                console.error('Error fetching Privacy Policy text:', error);
                // Handle errors here (e.g., show an error message)
            });
    }, [customerId]);

    const handleClosePrivacyModal = () => {
        setShowPrivacyModal(false);
    };

    const handleShowPrivacyModal = () => {
        setShowPrivacyModal(true);
    };

    return (
        <div>
            <h2>Customer Data</h2>
            {customerData ? (
                <div>
                    <p><strong>Customer Id:</strong> {customerData.id}</p>
                    <p><strong>First Name:</strong> {customerData.firstName}</p>
                    <p><strong>Last Name:</strong> {customerData.lastName}</p>
                    <p><strong>Customer Type:</strong> {customerData.customerType}</p>
                    <p><strong>Street Address:</strong> {customerData.streetAddress}</p>
                    <p><strong>Postal Code:</strong> {customerData.postalCode}</p>
                    <p><strong>City:</strong> {customerData.city}</p>
                    <p><strong>Phone Number:</strong> {customerData.phoneNumber}</p>
                    <p><strong>Email Address:</strong> {customerData.emailAddress}</p>
                </div>
            ) : (
                <p>Loading customer data...</p>
            )}

            <Button variant="primary" onClick={handleShowPrivacyModal}>
                Privacy Policy
            </Button>

            {/* Privacy Policy Modal */}
            <Modal show={showPrivacyModal} onHide={handleClosePrivacyModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Privacy Policy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Use ReactMarkdown to render the Markdown content */}
                    <ReactMarkdown>{privacyPolicyText}</ReactMarkdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePrivacyModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GDPRCustomerData;

