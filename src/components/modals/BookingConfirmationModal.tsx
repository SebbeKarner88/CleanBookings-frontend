import {Button, Modal} from "react-bootstrap";
import {AuthContext} from "../../context/AuthContext.tsx";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

interface IBookingConfirmationModal {
    show: boolean;
    onHide: () => void;
}

export default function BookingConfirmationModal({show, onHide}: IBookingConfirmationModal) {
    const {name, username} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Modal
            show={show}
            onHide={onHide}
            fullscreen="md-down"
        >
            <Modal.Header
                closeButton
                closeVariant="white"
                className="bg-dark-purple text-beige border-0"
            >
                <Modal.Title className="fw-bold">
                    Bokningsbekräftelse
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light-brown">
                <p>Tack för din bokning {name}!</p>
                <p>Du kommer snart att få en bekräftelse på din bokade städning skickad till
                    <span className="fw-bold"> {username}</span>
                </p>

            </Modal.Body>
            <Modal.Footer className="bg-light-brown border-0">
                <Button
                    variant="dark"
                    className="btn-dark-purple"
                    onClick={() => navigate("/my-pages")}
                >
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}