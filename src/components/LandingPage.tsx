import NavBar from "../common/NavBar"
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
// import Card from 'react-bootstrap/Card'
import sponge from '../assets/images/sponge.jpg'
import { Footer } from "../common/Footer"

function LandingPage() {

    return (
        <>
            <NavBar />
            {/* TODO: add images and witty description of company and their services */}
            <Container className="mt-5">
                <Image src={sponge} fluid />
            </Container>
            <Footer />
        </>
    )
}

export default LandingPage