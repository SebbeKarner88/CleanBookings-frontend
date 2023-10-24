import {Footer} from "../common/Footer.tsx"
import NavBar from "../common/NavBar.tsx"
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext'
import CleaningsPerType from "./booking-management/CleaningsPerType.tsx";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {IoSettingsOutline} from "react-icons/io5";
import '../styles/MyPages.css'

function MyPages() {
    const {username} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <div className="bg-image min-vw-100 py-4 text-start">
                <h1 className="fw-bold my-4 mx-2 text-center text-white">Mina sidor</h1>
                <div className="container bg-light-brown p-4 rounded rounded-4 shadow">
                    <div className="d-flex justify-content-between">
                        <p className="my-3 mx-2 mx-md-0">
                            Inloggad som: <span className="fw-bold">{username}</span>
                        </p>
                        <Link to="/my-pages/settings">
                            <Button size="lg" variant="btn-link" className="btn-dark-purple m-3">
                                <IoSettingsOutline
                                    color="var(--beige)"
                                    size={30}
                                    aria-label="Inställningar"/>
                            </Button>
                        </Link>
                    </div>
                    <h2 className="fw-bold">Mina bokningar</h2>
                    <CleaningsPerType/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default MyPages