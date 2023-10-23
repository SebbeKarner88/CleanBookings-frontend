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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sapiente ad in natus beatae architecto ducimus rerum voluptatum voluptate, ratione, iusto, sed commodi quis dolorum. Reprehenderit, atque. Odio, similique dicta.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima temporibus soluta magnam recusandae tempora vero voluptas repellendus qui? Aspernatur sed aliquid unde quas hic laborum vero possimus, amet praesentium nobis.</p>

                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam qui atque, quas dolores sint nam et ea placeat dolore voluptatum perferendis ut tempora culpa exercitationem assumenda laboriosam necessitatibus recusandae facilis.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ab dolore nostrum quos eos at exercitationem blanditiis commodi error nulla, quisquam quod ipsam maiores ipsum repudiandae, modi reprehenderit natus esse. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae minima, assumenda ratione accusamus delectus id dicta expedita omnis quisquam consequatur tempora eum laboriosam voluptatum molestias! Facilis consequatur fuga aperiam velit?
                    </p>

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