import {Button, Modal} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";

interface IPrivacyModal {
    onShow: boolean;
    onClose: () => void;
}

export default function PrivacyModal({onShow, onClose}: IPrivacyModal) {
    const [privacyPolicyText, setPrivacyPolicyText] = useState<string>("");

    useEffect(() => {
        // Fetch Privacy Policy text from the file
        fetch('/privacy-policy.txt')
            .then((response) => response.text())
            .then((text) => setPrivacyPolicyText(text))
            .catch((error) => {
                console.error('Error fetching Privacy Policy text:', error);
                // Handle errors here (e.g., show an error message)
            });
    }, []);

    return (
            <Modal show={onShow} onHide={onClose} size="lg" fullscreen="md-down">
                <Modal.Header closeButton>
                    <Modal.Title>Privacy Policy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReactMarkdown>{privacyPolicyText}</ReactMarkdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}