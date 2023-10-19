import {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {AuthContext} from './../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import NavBar from "../common/NavBar.tsx";
import {MdEdit} from "react-icons/md";
import CustomerData from "./CustomerData.tsx";
import PrivacyModal from "./modals/PrivacyModal.tsx";

type Customer = {
    id: string;
    firstName: string;
    lastName: string;
    customerType: string;
    streetAddress: string;
    postalCode: number
    city: string;
    phoneNumber: string
    emailAddress: string;
}

const SettingsView = () => {
    const [customerData, setCustomerData] = useState<Customer | null>(null);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const {customerId} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClosePrivacyModal = () => setShowPrivacyModal(false);
    const handleShowPrivacyModal = () => setShowPrivacyModal(true);

    useEffect(() => {
        // Fetch customer data from the backend
        axios.get(`http://localhost:8080/api/v1/gdpr/customer-data/${customerId}`)
            .then((response) => {
                const data: Customer = response.data;
                setCustomerData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors here (e.g., show an error message)
            });
    }, [customerId]);

    return (
        <div className="bg-light-subtle min-vh-100 min-vw-100">
            <NavBar/>
            <div className="container text-md-start mt-md-4">
                {customerData ? (
                    <div className="row my-3 mx-2 bg-white p-4 rounded-4 text-start border border-dark-subtle">
                        <div className="col-md-12 d-flex justify-content-between mb-4">
                            <h1 className="text-md-center fw-bold">
                                Customer Data
                            </h1>
                            <Button
                                variant="btn"
                                className="w-auto focus-ring focus-ring-dark"
                                aria-label="Press to edit customer data"
                                type="button"
                                onClick={() => navigate("/update-customer", {state: customerData})}>
                                <MdEdit size={30} />
                            </Button>
                        </div>

                       <CustomerData customer={customerData} />

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
            <PrivacyModal onShow={showPrivacyModal} onClose={handleClosePrivacyModal} />
        </div>
    );
};

export default SettingsView;

