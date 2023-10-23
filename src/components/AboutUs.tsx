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
                    <p>StädaFint AB: Smutsens mörka ursprung... <br/><br/>

                        I en skuggig värld av smuts och förfall, där varje vrå var täckt av ett tjockt lager av damm och hopplöshet, väcktes StädaFint AB till liv. Året var 1995, och grundarna Skurarn och Hinken började sin resa i en stad som kändes som om den hade glömts bort av tiden. Deras företag föddes inte ur en passion för renlighet, utan ur nödvändigheten att överleva i en värld där smutsen hade tagit över.</p>

                    <p>I begynnelsen var StädaFint AB inte mycket mer än en desperat strävan efter rena ytor. De började med minimala resurser och slitna städredskap. Deras arbete var smutsigt och oglamoröst, men det var en brutal reflektion av den värld de levde i. Varje skurande rörelse kändes som en kamp mot smutsens övermakt, en kamp som sällan vanns.</p>

                    <p>Människorna som sökte deras tjänster var inte kunder; de var desperata själar som behövde befrielse från sin smutsiga tillvaro. StädaFint ABs städare var inte proffs; de var överlevare, tränade av smutsens grymma regler. Men i denna mörka värld av damm och elände fann de en sorts gemenskap, en förståelse för att de var de sista hoppet för dem som tappat allt.</p>

                    <p>Med tiden, trots alla motgångar och smutsiga strider, började StädaFint AB göra små framsteg. Deras arbete blev något mer organiserat, deras redskap blev något bättre, men smutsen var aldrig långt borta. Varje glimt av renlighet varade bara en kort stund innan smutsen återvände, alltid starkare och mer beslutsam än tidigare.</p>

                    <p>Men mitt i denna förlamande smuts och hopplöshet höll Skurarn och Hinken fast vid en gnista av hopp. De drömde om en dag när deras stad skulle resa sig ur smutsens aska och glänsa i ny glans. Deras resa var inte bara en kamp mot smutsen; det var en kamp för hoppet och värdighet i en värld som hade förlorat båda. Och det var så StädaFint ABs mörka och dystopiska historia började, som en ödesdiger strid mot en oövervinnerlig fiende, där varje seger över smutsen var en seger för mänskligheten i dess mest desperata stund.</p>

                    <h4>Fakk Google!</h4>

                    <p style={{ fontStyle: "italic" }}>— Skurarn Moppsson, VD StädaFint AB</p>
                </div>
                <h1 className="emp">Våra Medarbetare</h1>
                <Container>
                    <EmployeeCardGrid />
                </Container>
                <h1 id="contact-us" className="emp">Kontakta oss</h1>
                <Contact />
            </div>
            <Footer />
        </>
    )
}

export default AboutUs