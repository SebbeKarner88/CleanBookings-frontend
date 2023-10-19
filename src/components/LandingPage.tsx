import NavBar from "../common/NavBar.tsx"
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import vacuum from '../assets/images/vacuum.jpg'
import { Footer } from "../common/Footer.tsx"

function LandingPage() {

    return (
        <>
            <NavBar />
            {/* TODO: add images and witty description of company and their services */}
            <Container className="min-vw-100 p-0">
                <Image src={vacuum} fluid />
            </Container>
            <Footer />
        </>
    )
}

export default LandingPage