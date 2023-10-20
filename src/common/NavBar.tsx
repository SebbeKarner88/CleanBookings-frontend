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
                                className="logo"
                                src={logo}
                                height={80}
                            />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <LinkContainer to="/services">
                                <Nav.Link className="px-3">
                                    Våra tjänster
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/AboutUs">
                                <Nav.Link className="px-3">
                                    Om oss
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/faq">
                                <Nav.Link className="px-3">
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
                                        <Link to="/my-pages">
                                            <Button size="lg" className="btn-dark-purple">
                                                Mina sidor
                                            </Button>
                                        </Link>
                                    </Nav>
                                    <Navbar.Text>
                                        <p className="visually-hidden">Signed in as: {name}</p>
                                        <Button variant="outline-danger" size="lg" className="mx-3 my-3 my-md-0"
                                            onClick={handleLogout}>
                                            Logga ut
                                        </Button>
                                    </Navbar.Text>
                                </>
                                :
                                <Nav>
                                    <LinkContainer to="/login">
                                        <Button size="lg" className="btn-outline-dark-purple mx-3">
                                            Logga in
                                        </Button>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <Button size="lg" className="btn-dark-purple mx-3">
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