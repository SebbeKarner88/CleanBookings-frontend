import FormUpdatePassword from "./forms/FormUpdatePassword.tsx";
import NavBar from "../common/NavBar.tsx";
import {Footer} from "../common/Footer.tsx";
import FormEditCustomerData from "./forms/FormEditCustomerData.tsx";

const EditCustomerDataView = () => {

    return (
        <>
            <NavBar />
            <div className="bg-image min-vw-100 min-vh-100 py-4">
                <div className="container">

                    <div className="row bg-light-brown p-3 p-md-4 rounded-4 text-start border border-dark-subtle">
                        <h2 className="fw-bold">
                            Ändra användaruppgifter
                        </h2>
                       <FormEditCustomerData />
                    </div>

                    <div className="row bg-light-brown mt-3 p-3 p-md-4 rounded-4 text-start border border-dark-subtle">
                        <h2 className="fw-bold">
                            Ändra lösenord
                        </h2>
                        <FormUpdatePassword />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default EditCustomerDataView;
