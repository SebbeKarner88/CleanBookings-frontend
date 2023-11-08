import {useLocation} from "react-router-dom";

export default function CheckoutView() {
    const location = useLocation();
    return (
        <iframe
            width={screen.width}
            height={screen.height}
            style={{maxWidth: "100vw", maxHeight: "100vh"}}
            srcDoc={location.state.snippet}
        ></iframe>
    );
}