import { NavLink } from "react-router-dom"
import { Nav, Navbar, Container } from "react-bootstrap";

const NavBar = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>
                        <Nav.Link>
                            <NavLink
                                style={({ isActive }) => ({
                                    color: isActive ? '#333' : '#545e6f',
                                    textDecoration: 'none'
                                })}
                                to="/">Clean Bookings</NavLink>
                        </Nav.Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link>
                                <NavLink to="/services">Services</NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink to="/contact">Contact</NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink to="/myPages">My Pages</NavLink>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar