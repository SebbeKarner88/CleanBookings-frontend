import NavBar from "../common/NavBar"
import Contact from "./Contact"

function AboutUs() {

    return (
        <>
            <NavBar />

            <div className="about-us-story">
                <h1>About Us</h1>
                {/*
                -Info about the company, vision and mission, employee and photos.
                - FAQ about services, booking and cancellations.
                - Eco cleaning methods and products
                - Reviews

                */}
                <Contact />
            </div>



        </>
    )
}

export default AboutUs