import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

const NavBar = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <Nav.Link>Clean Bookings</Nav.Link>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/services">
                            <Nav.Link>Services</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contact">
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/myPages">
                            <Nav.Link>My Pages</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}



export default NavBar