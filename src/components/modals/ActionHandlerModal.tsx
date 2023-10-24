import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Props {
    show: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ActionHandlerModal: React.FC<Props> = ({ show, title, message, onConfirm, onCancel }) => {
    return (
        <Modal
            show={show}
            onHide={onCancel}
            fullscreen="md-down"
        >
            <Modal.Header
                closeButton
                closeVariant="white"
                className="bg-dark-purple text-beige border-0"
            >
                <Modal.Title className="fw-bold">{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-light-brown">
                <p>{message}</p>
            </Modal.Body>

            <Modal.Footer className="bg-light-brown border-0">
                <Button
                    variant="dark"
                    className="btn-dark-purple"
                    onClick={onCancel}
                >
                    Avbryt
                </Button>
                <Button
                    variant="dark"
                    className="btn-dark-purple"
                    onClick={onConfirm}
                >
                    Bekräfta
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ActionHandlerModal;
