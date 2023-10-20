import NavBar from "../common/NavBar.tsx"
import Container from 'react-bootstrap/Container'
import { Footer } from "../common/Footer.tsx"
import Image from "react-bootstrap/Image";
import notFound from '../assets/images/notFoundBlack.jpg'
import "../styles/NotFound.css"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFoundView() {
    const navigation = useNavigate();

    return (
        <>

            <NavBar />
            <Container className="mt-5 mb-5 notFoundContainer">
                <Image
                    src={notFound}
                    height={360}
                    width={360}
                    fluid
                />
                <h5 className="text">The page {window.location.href} does not exist!</h5>
                <Button
                    className="btn btn-secondary mt-5"
                    onClick={() => navigation("/")}
                >Return to Homepage</Button>
            </Container>
            <Footer />

        </>
    )
}

export default NotFoundView