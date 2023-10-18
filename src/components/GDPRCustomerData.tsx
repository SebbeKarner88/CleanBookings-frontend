import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import CustomerDataResponse from '../dto/CustomerDataResponse';
import {Button, Modal} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import {AuthContext} from './../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import NavBar from "../common/NavBar.tsx";
import {MdEdit} from "react-icons/md";

const GDPRCustomerData: React.FC = () => {
    const [customerData, setCustomerData] = useState<CustomerDataResponse | null>(null);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const {customerId} = useContext(AuthContext);
    const [privacyPolicyText, setPrivacyPolicyText] = useState<string>(''); // State to store the Privacy Policy text
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
    }, [customerId]);

    const handleClosePrivacyModal = () => {
        setShowPrivacyModal(false);
    };

    const handleShowPrivacyModal = () => {
        setShowPrivacyModal(true);
    };

    const handleUpdateInformation = (values: object) => {
        navigate("/update-customer", {state: values})
    }

    return (
        <>
            <NavBar/>
            <div className="container text-md-start">
                {customerData ? (
                    <div className="row my-3 mx-2 bg-body-secondary p-4 rounded-4 text-start">
                        <div className="col-md-12 d-flex justify-content-between mb-4">
                            <h1 className="text-md-center fw-bold">
                                Customer Data
                            </h1>
                            <Button
                                variant="btn"
                                className="w-auto focus-ring focus-ring-dark"
                                aria-label="Press to edit customer data"
                                type="button"
                                onClick={() => {
                                    const values = {
                                        customerId: customerData?.id,
                                        firstName: customerData?.firstName,
                                        lastName: customerData?.lastName,
                                        customerType: customerData?.customerType,
                                        streetAddress: customerData?.streetAddress,
                                        postalCode: customerData?.postalCode,
                                        city: customerData?.city,
                                        phoneNumber: customerData?.phoneNumber,
                                        emailAddress: customerData?.emailAddress
                                    }
                                    handleUpdateInformation(values)
                                }}>
                                <MdEdit size={30}/>
                            </Button>
                        </div>

                        <div className="col-md-4">
                            <h2 className="h3 fw-semibold text-primary-emphasis">
                                Customer Id
                            </h2>
                            <p className="fs-5">
                                {customerData.id}
                            </p>
                            <h2 className="h3 fw-semibold text-primary-emphasis">
                                First Name
                            </h2>
                            <p className="fs-5">
                                {customerData.firstName}
                            </p>
                            <h2 className="h3 fw-semibold text-primary-emphasis">
                                Last Name
                            </h2>
                            <p className="fs-5">
                                {customerData.lastName}
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="h3 fw-semibold text-primary-emphasis">
                                Customer Type
                            </h2>
                            <p className="fs-5">
                                {customerData.customerType}
                            </p>
                            <h2 className="h3 fw-semibold text-primary-emphasis">
                                Street Address
                            </h2>
                            <p className="fs-5">
                                {customerData.streetAddress}
                            </p>
                            <h2 className="h3 fw-semibold text-primary-emphasis">
                                Postal Code
                            </h2>
                            <p className="fs-5">
                                {customerData.postalCode}
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="h3 fw-semibold text-primary-emphasis">
                                City
                            </h2>
                            <p className="fs-5">
                                {customerData.city}
                            </p>
                            <h2 className="h3 fw-semibold text-primary-emphasis">
                                Phone Number
                            </h2>
                            <p className="fs-5">
                                {customerData.phoneNumber}
                            </p>
                            <h2 className="h3 fw-semibold text-primary-emphasis">
                                Email Address
                            </h2>
                            <p className="fs-5">
                                {customerData.emailAddress}
                            </p>
                        </div>

                        <Button
                            variant='primary'
                            className='w-100 my-3'
                            onClick={handleShowPrivacyModal}>
                            Privacy Policy
                        </Button>

                        <Button
                            variant='danger'
                            className='w-100'
                            onClick={() => {
                                navigate("/myPages")
                            }}
                        >
                            Return to My Pages
                        </Button>

                    </div>
                ) : (
                    <p>Loading customer data...</p>
                )}

            </div>
            {/* Privacy Policy Modal */}
            <Modal show={showPrivacyModal} onHide={handleClosePrivacyModal} size="lg" fullscreen="md-down">
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
        </>
    );
};

export default GDPRCustomerData;

