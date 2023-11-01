import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

interface IRegistrationSuccessModal {
    onShow: boolean;
    username: string;
}

export default function RegistrationSuccessModal({onShow, username}: IRegistrationSuccessModal) {
    const navigate = useNavigate();

    return (
        <Modal
            show={onShow}
            fullscreen="md-down"
        >
            <Modal.Header className="bg-dark-purple text-beige border-0">
                <Modal.Title className="fs-6 fw-bold">
                    <h1 className="fs-2 fw-bold">Välkommen!</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light-brown">
                <p>Ditt nya konto har registrerats!</p>
                <p>Du loggar in med <span className="fw-bold">{username}</span> som användarnamn och det lösenord som du har valt.</p>
            </Modal.Body>
            <Modal.Footer className="bg-light-brown border-0">
                <Button variant="danger" onClick={() => navigate("/")}>
                    Stäng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}