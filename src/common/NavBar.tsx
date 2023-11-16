import {
    Nav,
    Navbar,
    Container,
    Button,
    NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from '../assets/images/logo.png'
import '../styles/NavBar.css'
import '../styles/Global.css'
import {logout} from "../api/CustomerApi.ts";

const NavBar = () => {
    const navigation = useNavigate();

    async function handleLogout() {
        const response = await logout();
        if (response?.status === 204) {
            sessionStorage.removeItem("isAuthenticated");
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("refresh_token");
            sessionStorage.removeItem("customerId");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("username");
            // setIsAuthenticated(false);
            // setCustomerId("");
            // setName("");
            // setUsername("");
            navigation("/");
        }
    }

    return (
        <>
            <Navbar expand="lg" id="navbar" className="border-dark-subtle border-bottom">
                <Container>
                    <Navbar.Brand>
                        <Link to="/">
                            <Image
                                className="mx-2"
                                src={logo}
                                height={70}
                            />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="my-3">
                            <LinkContainer to="/services">
                                <Nav.Link className="px-3 fs-5">
                                    Våra tjänster
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/faq">
                                <Nav.Link className="px-3 fs-5">
                                    Vanliga frågor
                                </Nav.Link>
                            </LinkContainer>
                            <NavDropdown title="Om oss" className="px-3 fs-5">
                                <NavDropdown.Item href="/about">
                                    Företaget
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/products">
                                    Våra produkter
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/contact">
                                    Kontakta oss
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        {
                            sessionStorage.getItem("isAuthenticated") == "true"
                                ?
                                <>
                                    <Nav>
                                        <LinkContainer to="/my-pages">
                                            <Button variant="dark" size="lg" className="btn-dark-purple">
                                                Mina sidor
                                            </Button>
                                        </LinkContainer>
                                        <p className="visually-hidden">Signed in as: {sessionStorage.getItem("username")}</p>
                                        <Button variant="outline-danger" size="lg" className="mx-3 my-3 my-md-0"
                                            onClick={handleLogout}>
                                            Logga ut
                                        </Button>
                                    </Nav>
                                </>
                                :
                                <Nav>
                                    <LinkContainer to="/login">
                                        <Button variant="dark" size="lg"
                                            className="btn-outline-dark-purple my-3 my-lg-0 mx-lg-3">
                                            Logga in
                                        </Button>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Button variant="dark" size="lg" className="btn-dark-purple mb-3 mb-lg-0">
                                            Registrera
                                        </Button>
                                    </LinkContainer>
                                </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    )
}

export default NavBar