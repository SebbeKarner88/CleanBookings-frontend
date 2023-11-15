import NavBar from "../common/NavBar.tsx"
import Container from 'react-bootstrap/Container'
import mysigt from '../assets/images/myspys.jpg'
import { Footer } from "../common/Footer.tsx"
import '../styles/LandingPage.css'
import ReviewCard from "./ReviewCard.tsx"
import { Email } from "./emails/Email.tsx"

function LandingPage() {

    return (
        <>
            <NavBar />
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
            style={{ backgroundImage: `url(${mysigt})` }}>
            <div className="intro">
                <div className="intro-subtitle">Skrubba bort dina bekymmer</div>
                <div className="intro-desc">Välj oss för ett glänsande resultat!</div>
            </div>
            <ReviewCard />
        </article>
    )
}

export default LandingPage