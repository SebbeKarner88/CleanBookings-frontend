import {
    Nav,
    Navbar,
    Container,
    Button,
    DropdownItem,
    NavLink,
    SplitButton
} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react'
import { AuthContext } from "../context/AuthContext.tsx";
import { Link, useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import logo from '../assets/images/logo.png'
import '../styles/NavBar.css'
import '../styles/Global.css'
import styled from "styled-components";

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
                                <Nav.Link>Services</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/AboutUs">
                                <Nav.Link>About Us</Nav.Link>
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
                                        <SplitButton
                                            title="My pages"
                                            variant="primary"
                                            onClick={() => navigation("/my-pages")}
                                        >
                                            <DropdownItem>
                                                <LinkContainer to="/my-pages/settings">
                                                    <NavLink>
                                                        Settings
                                                    </NavLink>
                                                </LinkContainer>
                                            </DropdownItem>

                                        </SplitButton>
                                    </Nav>
                                    <Navbar.Text>
                                        <p className="visually-hidden">Signed in as: {name}</p>
                                        <Button variant="outline-danger" className="mx-3 my-3 my-md-0"
                                            onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    </Navbar.Text>
                                </>
                                :
                                <Navbar.Text>
                                    <StyledLink to="/login">Sign in</StyledLink> 
                                    <Link to="/register">
                                        <Button id="register" className="my-3 my-md-0">
                                            Register
                                        </Button>
                                    </Link>
                                </Navbar.Text>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

const StyledLink = styled(Link)`
    color: var(--dark-purple);
    font-family: 'NTR', sans-serif;
    font-size: 1.5em;
    text-decoration: none;
    padding-right: 20px;¨
`

export default NavBar