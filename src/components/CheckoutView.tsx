import {useLocation} from "react-router-dom";
import NavBar from "../common/NavBar.tsx";
import {Footer} from "../common/Footer.tsx";

export default function CheckoutView() {
    const location = useLocation();

    return (
        <>
            <NavBar/>
            <div className="bg-image min-vw-100 d-flex align-items-center py-4">
                <div className="bg-white p-md-4 rounded rounded-4 my-md-4 m-auto">
                    <iframe
                        width={800}
                        height={900}
                        className={"m-auto"}
                        style={{maxWidth: "100vw", maxHeight: "100vh"}}
                        srcDoc={location.state.snippet}
                    ></iframe>
                </div>
            </div>
            <Footer/>
        </>
    );
}