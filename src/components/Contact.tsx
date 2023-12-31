import { FieldValues, useForm } from 'react-hook-form';
import { FormField } from "./forms/FormField";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import '../styles/Contact.css'
import { sendCustomerMessage } from "../api/CustomerApi";
import { useState } from "react";
import NavBar from '../common/NavBar';
import { Footer } from '../common/Footer';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { render } from '@react-email/render';
import {Email} from "./emails/Email.tsx";

const schema = z.object({
    name: z
        .string()
        .nonempty({ message: "Namn är ett obligatoriskt fält." }),
    email: z
        .string()
        .nonempty({ message: "Epostadress är ett obligatoriskt fält." }),
    subject: z
        .string()
        .nonempty({ message: "Ämne är ett obligatoriskt fält." }),
    message: z
        .string()
        .nonempty({ message: "Meddelande är ett obligatoriskt fält." }),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
    const [ modalVisible, setModalVisible ] = useState(false)
    const [ isAssigning, setIsAssigning ] = useState(false)
    const closeModal = () => setModalVisible(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    async function onSubmit(data: FieldValues) {
        // TODO: Generate a snippet that actually contains the data from the form below...
        const htmlSnippet = render(<Email />, {
            pretty: true,
        });

        setIsAssigning(true)
        try {
            const response = await sendCustomerMessage(data.name, data.email, data.subject, data.message, htmlSnippet);
            if (response?.status == 200) {
                setIsAssigning(false)
                setModalVisible(!modalVisible)
                reset()
            } else {
                setIsAssigning(false)
                console.error(errors)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <NavBar />
            <div className="bg-image min-vw-100 py-4 text-start">
                <h1 className="fw-bold my-4 mx-2 text-center text-white">Kontakta oss</h1>
                <Container className="container bg-light-brown p-5 rounded rounded-4 shadow mb-5">
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
                                <div>
                                    <label htmlFor="message" className="form-label fw-semibold">
                                        Meddelande
                                        <div className="form-text">
                                            Beskriv vad vi kan hjälpa dig med här.
                                        </div>
                                    </label>
                                    {
                                        errors.message &&
                                        <div className="text-danger my-1">
                                            {errors.message.message}
                                        </div>
                                    }
                                    <textarea
                                        {...register("message")}
                                        className={errors.message ? "form-control is-invalid" : "form-control border-dark-purple"}
                                        id="message"
                                        rows={4}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" className="form-group my-4">
                                <Button
                                    type="submit"
                                    variant="dark"
                                    size="lg"
                                    className="btn-dark-purple mb-3 mb-lg-0"
                                    disabled={isAssigning}>
                                    {isAssigning ? "Skickar..." : "Skicka"}
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
                        <Button className="btn-dark-purple mb-3 mb-lg-0" onClick={closeModal}>
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
