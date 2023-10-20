import {Button} from "react-bootstrap";
import {VscAccount} from "react-icons/vsc";
import {Link} from "react-router-dom";

export default function ContinueButton() {
    return (
        <>
            <Button type="submit" className="btn btn-dark-purple w-100">
                Fortsätt
            </Button>

            <div className="mt-3 d-flex gap-2 align-items-center">
                <VscAccount size={20}/>
                <strong>Already have an account? </strong><Link className="text-dark-purple" to="/login">Sign in</Link>
            </div>
        </>
    )
}