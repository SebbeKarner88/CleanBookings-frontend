import NavBar from "../common/NavBar.tsx"
import { FormLogin } from "./forms/FormLogin.tsx";
import mysigt from '../assets/images/myspys.jpg'

const LogIn = () => {

    /* TODO: add logic for logging in as customer/employee/admin */

    return (
        <>
            <NavBar />
            <article
                style={{ backgroundImage: `url(${mysigt})` }}>
                <FormLogin />
            </article>
        </>
    )
}

export default LogIn