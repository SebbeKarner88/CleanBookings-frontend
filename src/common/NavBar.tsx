import {
    Nav,
    Navbar,
    Container,
    Button,
} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react'
import { AuthContext } from "../context/AuthContext.tsx";
import { Link, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from '../assets/images/logo.png'
import '../styles/NavBar.css'
import '../styles/Global.css'

const NavBar = () => {
    const { isAuthenticated, name, setIsAuthenticated, setCustomerId, setName } = useContext(AuthContext);
    const navigation = useNavigate();

    async function handleLogout() {
        setIsAuthenticated(false);
        setCustomerId("");
        setName("");
        navigation("/");
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
                            <LinkContainer to="/AboutUs">
                                <Nav.Link className="px-3 fs-5">
                                    Om oss
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/faq">
                                <Nav.Link className="px-3 fs-5">
                                    Vanliga frågor
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>

                        {/*<Form className="d-flex">*/}
                        {/*    <Form.Control*/}
                        {/*        type="search"*/}
                        {/*        placeholder="Search"*/}
                        {/*        className="me-2"*/}
                        {/*        aria-label="Search"*/}
                        {/*    />*/}
                        {/*    <Button variant="outline-dark">Search</Button>*/}
                        {/*</Form>*/}

                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        {
                            isAuthenticated
                                ?
                                <>
                                    <Nav>
                                        <LinkContainer to="/my-pages">
                                            <Button variant="dark" size="lg" className="btn-dark-purple">
                                                Mina sidor
                                            </Button>
                                        </LinkContainer>
                                        <p className="visually-hidden">Signed in as: {name}</p>
                                        <Button variant="outline-danger" size="lg" className="mx-3 my-3 my-md-0"
                                            onClick={handleLogout}>
                                            Logga ut
                                        </Button>
                                    </Nav>
                                </>
                                :
                                <Nav>
                                    <LinkContainer to="/login">
                                        <Button variant="dark" size="lg" className="btn-outline-dark-purple my-3 my-lg-0 mx-lg-3">
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
            </Navbar>
        </>
    )
}

export default NavBar