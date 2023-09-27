import NavBar from "../common/NavBar"
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import sponge from '../assets/images/sponge.jpg'

function LandingPage() {

    return (
        <>
            <NavBar />
            {/* TODO: add images and witty description of company and their services */}
            {/* TODO: add footer component? */}
            <p>Tjo bror</p>
            <Container>
                <Image src={sponge} fluid />
            </Container>
        </>
    )
}

export default LandingPage