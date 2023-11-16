import {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import NavBar from "../common/NavBar.tsx";
import {MdEdit} from "react-icons/md";
import CustomerData from "./CustomerData.tsx";
import PrivacyModal from "./modals/PrivacyModal.tsx";
import {Footer} from "../common/Footer.tsx";
import api from "../api/ApiRootUrl.ts";

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
    const customerId = sessionStorage.getItem("customerId");
    const [customerData, setCustomerData] = useState<Customer | null>(null);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const navigate = useNavigate();
    const handleClosePrivacyModal = () => setShowPrivacyModal(false);
    const handleShowPrivacyModal = () => setShowPrivacyModal(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(
                    `/gdpr/customer-data/${customerId}`,
                    {
                        headers: {"Authorization": `Bearer ${sessionStorage.getItem("access_token")}`}
                    }
                );
                if (response?.status === 200)
                    return response.data;
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser().then(data => setCustomerData(data));
    }, [customerId]);

    return (
        <>
            <NavBar/>
            <div className="bg-image min-vw-100 py-4">
                <h1 className="text-md-center fw-semibold text-white">
                    Mina inställningar
                </h1>
                <div className="container text-start my-3 bg-light-brown p-4 rounded-4 shadow">
                    {customerData ? (
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-between mb-4">
                                <h2 className="fw-bold">
                                    Användaruppgifter
                                </h2>
                                <Button
                                    variant="btn"
                                    className="w-auto focus-ring focus-ring-dark"
                                    aria-label="Press to edit customer data"
                                    type="button"
                                    onClick={() => navigate("/update-customer", {state: customerData})}>
                                    <MdEdit size={30}/>
                                </Button>
                            </div>

                            <CustomerData customer={customerData}/>

                            <Button
                                variant="dark"
                                className='btn-dark-purple w-100 my-3'
                                onClick={handleShowPrivacyModal}>
                                Integritetspolicy - så hanterar vi din data!
                            </Button>

                            <Button
                                variant="danger"
                                className="w-100"
                                onClick={() => navigate("/my-pages")}
                            >
                                Tillbaka till mina sidor
                            </Button>
                        </div>
                    ) : (
                        <p>Loading customer data...</p>
                    )}
                </div>
            </div>
            <Footer/>
            <PrivacyModal onShow={showPrivacyModal} onClose={handleClosePrivacyModal}/>
        </>
    );
};

export default SettingsView;

