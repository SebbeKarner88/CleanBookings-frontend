import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

interface IErrorModal {
    onShow: boolean;
    onClose: () => void;
    message: string;
    retryButton?: boolean
    retryRequest?: () => void;
}

export default function ErrorModal({onShow, onClose, message, retryButton, retryRequest}: IErrorModal) {
    return (
        <Modal
            show={onShow}
            fullscreen="md-down"
            onHide={onClose}
        >
            <Modal.Header className="bg-danger text-white border-0" closeButton={true} closeVariant="white">
                <Modal.Title className="fs-6 fw-bold">
                    <h1 className="fs-2 fw-bold">Åh nej, något gick fel...</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light-brown">
                <h2 className="fw-bold fs-5">Felmeddelande:</h2>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer className="bg-light-brown border-0">
                <Button
                    variant="danger"
                    onClick={onClose}
                >
                    Stäng
                </Button>
                {
                    retryButton &&
                    <Button
                        variant="dark"
                        className="btn-dark-purple"
                        onClick={retryRequest}
                    >
                        Försök igen
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}