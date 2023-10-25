import { useForm } from 'react-hook-form';
import { FormField } from "./forms/FormField";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import '../styles/Contact.css'
import { sendCustomerEmail } from "../api/CustomerApi";
import { useState } from "react";
import NavBar from '../common/NavBar';
import { Footer } from '../common/Footer';

interface IFormInput {
    name: string;
    email: string;
    subject: string;
    message: string;
}


const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [ isSending, setIsSending ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);
    const closeModal = () => setModalVisible(false);
    const onSubmit = async (data: IFormInput) => {
        setIsSending(true);
        try {
            const response = await sendCustomerEmail(
                data.name,
                data.email,
                data.subject,
                data.message);

            if (response?.status === 200) {
                setModalVisible(true);
            }
        } catch (error) {
            console.error(error);
            alert("Något gick fel.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className="outer-contact-container">
                <h1 id="contact-us" className="emp">Kontakta oss</h1>
                <Container className="contact-container bg-light-brown">
                    <h3 className="contact-title">Har du några frågor? Hör av dig!</h3>
                    <p className="contact-description">
                        Vi har sammanställt svaren på de vanligaste frågorna i vår <a id="faq-link" href="/faq">FAQ-sektion</a>. Om du inte hittar den information du söker,
                        eller om du önskar hjälp med att boka vår städtjänst, är det enklaste sättet att nå oss via e-post eller telefon.
                        Du kan även besöka oss personligen. Nedan finner du vår kontaktinformation samt öppettider:
                    </p>
                    <ul className="info-list">
                        <li>Email: <a href="mailto:booking@cleanbookings.com">booking@cleanbookings.com</a></li>
                        <li>Telefon: <span>555-CLEAN-ME-NOW</span></li>
                        <li>Mobil: <span>070-CLEAN-ME-NOW</span></li>
                        <li>Plats: <span>Stockholm HQ</span></li>
                        <li> Öppettider: MÅN-FRE 8:00 - 15:00 </li>
                    </ul>
                    <p className="additional-info">Tveka inte att kontakta oss om du behöver vidare hjälp med din bokning eller har ytterligare frågor.
                        Vi strävar efter att svara på alla förfrågningar inom en arbetsdag.</p>


                    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                        <Row>
                            <Col lg="6" className="form-group">
                                <FormField
                                    fieldError={errors.name}
                                    register={register}
                                    label="Namn"
                                    fieldName="name"
                                    inputType="text"
                                />
                            </Col>
                            <Col lg="6" className="form-group">
                                <FormField
                                    fieldError={errors.email}
                                    register={register}
                                    label="E-post"
                                    fieldName="email"
                                    inputType="email"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" className="form-group">
                                <FormField
                                    fieldError={errors.subject}
                                    register={register}
                                    label="Ämne"
                                    fieldName="subject"
                                    inputType="text"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" className="form-group">
                                <FormField
                                    fieldError={errors.message}
                                    register={register}
                                    label="Meddelande"
                                    fieldName="message"
                                    inputType="textarea"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" className="form-group">
                                <Button type="submit" variant="dark" size="lg" className="btn-dark-purple mb-3 mb-lg-0" disabled={isSending}>
                                    {isSending ? 'Skickar...' : 'Skicka'}
                                </Button>

                            </Col>
                        </Row>
                    </form>
                </Container>
                <Modal
                    show={modalVisible}
                    onHide={closeModal}
                    fullscreen="md-down"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Meddelande skickat!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tack för ditt meddelande! Vi kommer att återkomma så snart som möjligt.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Stäng
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Footer />
        </>

    );
};

export default Contact;
