import NavBar from "../common/NavBar"
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import sponge from '../assets/images/sponge.jpg'

function LandingPage() {

    return (
        <>
            <NavBar />
            {/* TODO: add images and witty description of company and their services */}
            {/* TODO: add footer component? */}

            <Container className="mt-5">
                <Image src={sponge} fluid />
            </Container>

            <Card className="mt-5">
                <Card.Header>What's Been Said About Us</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            Här sparas det inte på dyra rengöringsmedel!{' '}
                        </p>
                        <footer className="blockquote-footer">
                            Sven Svensson, <cite title="Source Title">A Happy Client</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </>
    )
}

export default LandingPage