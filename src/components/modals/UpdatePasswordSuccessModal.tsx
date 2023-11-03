import {Button, Modal} from "react-bootstrap";

interface IUpdatePasswordSuccessModal {
    onShow: boolean;
    onClose: () => void;
}

export default function UpdatePasswordSuccessModal({onShow, onClose}: IUpdatePasswordSuccessModal) {
    return (
        <Modal
            show={onShow}
            onHide={onClose}
            fullscreen="md-down"
        >
            <Modal.Header
                className="bg-dark-purple text-beige border-0"
                closeButton
                closeVariant="white"
            >
                <Modal.Title className="fs-6 fw-bold">
                    <h1 className="fs-4 fw-bold">Uppdateringen lyckades!</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light-brown">
                <p>Ditt nya lösenord har uppdaterats.</p>
            </Modal.Body>
            <Modal.Footer className="bg-light-brown border-0">
                <Button variant="danger" onClick={onClose}>
                    Stäng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}