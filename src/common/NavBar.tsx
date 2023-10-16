import {
    Nav,
    Navbar,
    Container,
    Form,
    Button,
    DropdownItem,
    NavLink,
    SplitButton
} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {useContext} from 'react'
import {AuthContext} from "../context/AuthContext.tsx";
import {Link, useNavigate} from "react-router-dom";

const NavBar = () => {
    const {isAuthenticated, name, setIsAuthenticated, setCustomerId, setName} = useContext(AuthContext);
    const navigation = useNavigate();

    async function handleLogout() {
        setIsAuthenticated(false);
        setCustomerId("");
        setName("");
        navigation("/");
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary py-2">
                <Container>
                    <Navbar.Brand>
                        <Link to="/" className="link-dark">
                            Clean Bookings
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to="/services">
                                <Nav.Link>Services</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/AboutUs">
                                <Nav.Link>About Us</Nav.Link>
                            </LinkContainer>
                        </Nav>

                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-dark">Search</Button>
                        </Form>

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
                                            onClick={() => navigation("/myPages")}
                                        >
                                            <DropdownItem>
                                                <LinkContainer to="/gdpr-customer-data">
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
                                    <span><Link to="/login">Sign in</Link> or </span>
                                    <Link to="/register">
                                        <Button variant="success" className="my-3 my-md-0">
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


export default NavBar