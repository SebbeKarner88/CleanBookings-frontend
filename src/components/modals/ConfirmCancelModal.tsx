import {Button, Modal} from "react-bootstrap";

interface IConfirmCancelModal {
    show: boolean;
    onClose: () => void;
    handleRequest: () => void;
    isSendingRequest: boolean;
    jobId: string;
}

export default function ConfirmCancelModal({show, onClose, jobId, handleRequest, isSendingRequest}: IConfirmCancelModal) {
    return (
        <Modal
            show={show}
            onHide={onClose}
            scrollable={true}
            size="lg"
            fullscreen="md-down"
        >
            <Modal.Header
                closeButton
                closeVariant="white"
                className="bg-dark-purple text-beige border-0"
            >
                <Modal.Title className="fw-bold">
                    {"Job ID: " + jobId}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light-brown">
                Vill du avboka denna städning?
            </Modal.Body>
            <Modal.Footer className="bg-light-brown border-0">
                        <Button
                            variant="danger"
                            onClick={onClose}
                        >
                            Avbryt
                        </Button>

                        <Button
                            variant="dark"
                            className="btn-dark-purple"
                            onClick={handleRequest}
                            disabled={isSendingRequest}
                        >
                            {isSendingRequest ? "Avbokar..." : "Avboka"}
                        </Button>
            </Modal.Footer>
        </Modal>
    )
}