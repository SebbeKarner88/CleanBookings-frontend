import NavBar from "../common/NavBar/NavBar.tsx"
import {FormLogin} from "./forms/FormLogin.tsx";

const LogIn = () => {

    /* TODO: add logic for logging in as customer/employee/admin */

    return (
        <>
            <NavBar />
            <FormLogin/>
        </>
    )
}

export default LogIn