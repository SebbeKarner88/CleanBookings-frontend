// ActionHandlerModal.tsx
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
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Avbryt
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Bekräfta
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ActionHandlerModal;
