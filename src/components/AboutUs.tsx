import NavBar from "../common/NavBar.tsx"
import '../styles/AboutUs.css'
import { Footer } from "../common/Footer.tsx"
import EmployeeCardGrid from "./EmployeeCardGrid.tsx";
import Container from "react-bootstrap/Container";
import Contact from "./Contact.tsx";

function AboutUs() {

    return (
        <>
            <NavBar />
            <div className="aboutContainer">
                <h1 className="emp">Om StädaFint AB</h1>
                <div className="history">
                    <p>StädaFint AB: Från Dröm till Ren Verklighet <br/><br/>

                        År 1995, med en gemensam övertygelse om att varje utrymme förtjänar omsorg, grundade Skurarn och Hinkish StädaFint AB. Deras resa började som ett litet familjeföretag med en stor passion för städning och kundservice.</p>

                    <p>Genom år av hängivenhet och noggrannhet växte StädaFint AB till att bli en pålitlig städtjänst. Deras fokus på överlägsen kvalitet och miljövänliga städmetoder gjorde dem snabbt populära. De investerade i avancerad teknik och högkvalitativa rengöringsprodukter för att säkerställa att varje kund fick den bästa möjliga servicen.</p>

                    <p>StädaFint AB strävade inte bara efter att erbjuda enastående städning, de engagerade sig också i samhället. Genom att erbjuda arbete och stödja lokala välgörenhetsprojekt blev de en del av gemenskapen på ett meningsfullt sätt.</p>

                    <p>Idag är StädaFint AB inte bara ett städföretag, det är en berättelse om framgång och passion. Deras resa är en inspirerande historia om att följa sin dröm, erbjuda enastående service och göra en verklig skillnad i samhället. Med varje städning de utför fortsätter de sin renande resa och lämnar ett rent och glänsande avtryck överallt där de går.</p>

                    <p style={{fontStyle: "italic"}}>— Skurarn Moppsson, VD StädaFint AB</p>
                </div>
                <h1 className="emp">Våra Medarbetare</h1>
                <Container>
                    <EmployeeCardGrid />
                </Container>
                <h1 className="emp">Kontakta oss</h1>
                <Contact />
            </div>
            <Footer />
        </>
    )
}

export default AboutUs