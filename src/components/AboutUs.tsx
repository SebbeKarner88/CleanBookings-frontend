import NavBar from "../common/NavBar.tsx"
import Contact from "./Contact"
import p1 from '../assets/images/p1.jpg'
import p2 from '../assets/images/p2.jpg'
import p3 from '../assets/images/p3.jpg'
import p4 from '../assets/images/p4.jpg'
import '../styles/AboutUs.css'
import {Footer} from "../common/Footer.tsx"
import EmployeeCardGrid from "./EmployeeCardGrid.tsx";
import Container from "react-bootstrap/Container";

function AboutUs() {

    return (
        <>
            <NavBar/>
            <h1>About Us</h1>
            {/*
                -Info about the company, vision and mission, employee and photos.
                - FAQ about services, booking and cancellations.
                - Eco cleaning methods and products
                - Reviews

                */}
            <h3 className="emp">Our Employees</h3>
            <Container>
                <EmployeeCardGrid/>
            </Container>
            <Contact/>
            <Footer/>
        </>
    )
}

export default AboutUs