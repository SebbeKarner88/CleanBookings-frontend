import { Footer } from "../common/Footer.tsx";
import NavBar from "../common/NavBar"
import { FormRegisterCustomer } from "./forms/FormRegisterCustomer.tsx";

const Register = () => {

    /* TODO: add logic for register in as customer/employee/admin */

    return (
        <>
            <NavBar />
            <div style={{ "maxWidth": "800px", "margin": "auto" }}>
                <h1 className="my-3 px-4 fw-bold text-start text-md-center">Register an account</h1>
                <FormRegisterCustomer />
            </div>
            <Footer />
        </>
    )
}

export default Register