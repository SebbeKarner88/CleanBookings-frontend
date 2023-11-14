
import { Button, Modal } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

interface ITermsConditionsModal {
    onShow: boolean;
    onClose: () => void;
}

export default function TermsConditionsModal({ onShow, onClose }: ITermsConditionsModal) {
    const [termsConditionsText, setTermsConditionsText] = useState<string>("");
    const [language, setLanguage] = useState<string>("sv"); // Default to Swedish
    const ukFlag = '/great-britain-flag.png';
    const swedenFlag = '/sweden-flag.svg';

    useEffect(() => {
        // Determine the file to fetch based on the selected language
        const fileToFetch = language === 'sv' ? '/terms-conditions-sv.txt' : '/terms-conditions-en.txt';

        fetch(fileToFetch)
            .then((response) => response.text())
            .then((text) => setTermsConditionsText(text))
            .catch((error) => {
                console.error(`Error fetching Terms & Conditions text (${language}):`, error);
            });
    }, [language]); // Dependency on 'language' to refetch when it changes

    return (
        <Modal show={onShow} onHide={onClose} size="lg" fullscreen="md-down">
            <Modal.Header closeButton className="text-mauve">
                <Modal.Title>{language === 'sv' ? 'Allmänna Villkor' : 'Terms & Conditions'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-mauve">
                <div className="d-flex justify-content-end">
                    <button onClick={() => setLanguage('sv')} className="btn p-1">
                        <img src={swedenFlag} alt="Swedish" width="30" />
                    </button>
                    <button onClick={() => setLanguage('en')} className="btn p-1">
                        <img src={ukFlag} alt="English" width="30" />
                    </button>
                </div>
                <ReactMarkdown>{termsConditionsText}</ReactMarkdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} className="btn-dark-purple">
                    {language === "sv" ? "Stäng" : "Close"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

