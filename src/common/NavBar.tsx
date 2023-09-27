import { NavLink } from "react-router-dom"

const NavBar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    {/* <div className="logo">
                        <Logo />
                    </div> */}
                    <div className="nav-elements">
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/services">Services</NavLink>
                            </li>
                            <li>
                                <NavLink to="/myPages">My Pages</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar