import NavBar from "../../common/NavBar.tsx";
import { Footer } from "../../common/Footer.tsx";
import '../../styles/ServicesView.css'
import CleaningCard from "./CleaningCard.tsx";

function ServicesView() {

    return (
        <>
            <NavBar />
            <div className="bg-image min-vw-100 py-4 text-start text-center">
                <h1 className="fw-bold my-4 mx-2 text-center text-white">Våra tjänster</h1>
                <CleaningCard />
            </div>
            <Footer />
        </>
    );
}

export default ServicesView