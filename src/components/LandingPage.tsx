import NavBar from "../common/NavBar.tsx"
import Container from 'react-bootstrap/Container'
import mysigt from '../assets/images/myspys.jpg'
import { Footer } from "../common/Footer.tsx"
import '../styles/LandingPage.css'

function LandingPage() {

    return (
        <>
            <NavBar />
            {/* TODO: add images and witty description of company and their services */}
            <Container className="min-vw-100 p-0">
                <Background />
            </Container>
            <Footer />
        </>
    )
}

const Background = () => {
    return (
        <article
        className=""
        style={{ backgroundImage: `url(${mysigt})`}}>
            <h1>VI ÄR BÄST</h1>
        </article>
    )
}

export default LandingPage