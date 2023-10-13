
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CustomerDataResponse from '../dto/CustomerDataResponse';
import { Button, Modal } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { AuthContext } from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GDPRCustomerData: React.FC = () => {
    const [ customerData, setCustomerData ] = useState<CustomerDataResponse | null>(null);
    const [ showPrivacyModal, setShowPrivacyModal ] = useState(false);
    const { customerId } = useContext(AuthContext);
    const [ privacyPolicyText, setPrivacyPolicyText ] = useState<string>(''); // State to store the Privacy Policy text
    const navigate = useNavigate()

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
    }, [ customerId ]);

    const handleClosePrivacyModal = () => {
        setShowPrivacyModal(false);
    };

    const handleShowPrivacyModal = () => {
        setShowPrivacyModal(true);
    };

    const handleUpdateInformation = (values: object) => {
        navigate("/update-customer", { state: values })
    }

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
            
            
            <Button 
            variant='secondary'
            className='w-20 mt-3'
            onClick={() => {
                const values = {
                    customerId: customerData?.id, firstName: customerData?.firstName,
                    lastName: customerData?.lastName, customerType: customerData?.customerType,
                    streetAddress: customerData?.streetAddress, postalCode: customerData?.postalCode,
                    city: customerData?.city, phoneNumber: customerData?.phoneNumber, emailAddress: customerData?.emailAddress
                }
                handleUpdateInformation(values)
            }}>
                Update information
            </Button>
            {' '}
            <Button
                variant='secondary'
                className='w-20 mt-3'
                onClick={handleShowPrivacyModal}>
                Privacy Policy
            </Button>
            {' '}
            <Button
                variant='secondary'
                className='w-20 mt-3'
                onClick={() => {
                    navigate("/myPages")
                }}
            >
                Return to My Pages
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

