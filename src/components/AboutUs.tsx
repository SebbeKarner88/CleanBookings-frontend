import NavBar from "../common/NavBar.tsx"
import '../styles/AboutUs.css'
import {Footer} from "../common/Footer.tsx"
import EmployeeCardGrid from "./EmployeeCardGrid.tsx";
import Container from "react-bootstrap/Container";

function AboutUs() {

    return (
        <>
            <NavBar/>
            <div className="aboutContainer">

                <h1 className="emp">Medarbetare</h1>
                <Container>
                    <EmployeeCardGrid/>
                </Container>
            </div>
            <Footer/>
        </>
    )
}

export default AboutUs