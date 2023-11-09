import NavBar from "../common/NavBar.tsx"
import { FormLogin } from "./forms/FormLogin.tsx";
import mysigt from '../assets/images/myspys.jpg'

const LogIn = () => {

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