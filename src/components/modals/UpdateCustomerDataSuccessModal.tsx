import {Button, Modal} from "react-bootstrap";

interface IUpdateCustomerDataSuccessModal {
    onShow: boolean;
    onClose: () => void;
}

export default function UpdateCustomerDataSuccessModal({onShow, onClose}: IUpdateCustomerDataSuccessModal) {
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
                <p>Din nya data har blivit uppdaterat.</p>
            </Modal.Body>
            <Modal.Footer className="bg-light-brown border-0">
                <Button variant="danger" onClick={onClose}>
                    Stäng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}