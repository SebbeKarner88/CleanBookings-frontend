import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.tsx";

export default function ConfirmationView() {
    const {name, username} = useContext(AuthContext);

    return (
        <div className="container">
            <h1 className="text-md-center fw-bold my-4">
                Tack för din bokning {name}!
            </h1>
            <img
                className={"my-4"}
                src="/src/assets/images/check.png"
                alt="A checkbox indicating success"
                width={300}
            />
            <p className={"my-4 text-start"}>Du kommer snart att få en bekräftelse på din bokade städning skickad till
                <span className="fw-bold"> {username}</span>
            </p>
        </div>
    )
}