import NavBar from "../common/NavBar"
import {FormRegister} from "./forms/FormRegister.tsx";

const Register = () => {

    /* TODO: add logic for register in as customer/employee/admin */

    return (
        <>
            <NavBar/>
            <h1 className="my-3">Register</h1>
            <FormRegister/>
        </>
    )
}

export default Register