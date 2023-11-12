import {Button, Modal} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import {useEffect, useState} from "react";

interface ITermsConditionsModal {
    onShow: boolean;
    onClose: () => void;
}

export default function TermsConditionsModal({onShow, onClose}: ITermsConditionsModal) {
    const [termsConditionsText, setTermsConditionsText] = useState<string>("");

    useEffect(() => {
        // Fetch Terms & Conditions text from the file
        fetch('/terms-conditions-sv.txt')
            .then((response) => response.text())
            .then((text) => setTermsConditionsText(text))
            .catch((error) => {
                console.error('Error fetching Terms & Conditions text:', error);
                // Handle errors here (e.g., show an error message)
            });
    }, []);

    return (
            <Modal show={onShow} onHide={onClose} size="lg" fullscreen="md-down">
                <Modal.Header closeButton className="text-mauve">
                    {/*<Modal.Title>Terms & Conditions</Modal.Title>*/}
                    <Modal.Title>Allmänna Villkor</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-mauve">
                    <ReactMarkdown>{termsConditionsText}</ReactMarkdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose} className="btn-dark-purple">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}