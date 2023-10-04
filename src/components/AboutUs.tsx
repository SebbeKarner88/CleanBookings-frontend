import NavBar from "../common/NavBar"
import Contact from "./Contact"
import p1 from '../assets/images/p1.jpg'
import p2 from '../assets/images/p2.jpg'
import p3 from '../assets/images/p3.jpg'
import p4 from '../assets/images/p4.jpg'
import './AboutUs.css'
import { Footer } from "../common/Footer"

function AboutUs() {

    return (
        <>
            <NavBar />
            <h1>About Us</h1>
            {/*
                -Info about the company, vision and mission, employee and photos.
                - FAQ about services, booking and cancellations.
                - Eco cleaning methods and products
                - Reviews

                */}
            <h3 className="emp">Our Employees</h3>
            <div className="profile-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="img2"><img src={p1} alt="" /></div>
                                <div className="main-text">
                                    <h4>Person One</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus accusantium ex error, nemo consequuntur iusto debitis quisquam nulla tempora voluptatum dolores unde alias sint nobis eum eligendi eius? Explicabo, maiores.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card">
                                <div className="img2"><img src={p2} alt="" /></div>
                                <div className="main-text">
                                    <h4>Person Two</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus accusantium ex error, nemo consequuntur iusto debitis quisquam nulla tempora voluptatum dolores unde alias sint nobis eum eligendi eius? Explicabo, maiores.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card">
                                <div className="img2"><img src={p3} alt="" /></div>
                                <div className="main-text">
                                    <h4>Person Three</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus accusantium ex error, nemo consequuntur iusto debitis quisquam nulla tempora voluptatum dolores unde alias sint nobis eum eligendi eius? Explicabo, maiores.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card">
                                <div className="img2"><img src={p4} alt="" /></div>
                                <div className="main-text">
                                    <h4>Person Four</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus accusantium ex error, nemo consequuntur iusto debitis quisquam nulla tempora voluptatum dolores unde alias sint nobis eum eligendi eius? Explicabo, maiores.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Contact />
            <Footer />
        </>
    )
}

export default AboutUs