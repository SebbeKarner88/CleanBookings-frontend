import React from 'react';
import { useForm } from 'react-hook-form';
import {FormField} from "./forms/FormField";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../common/NavBar.tsx"

interface IFormInput {
    name: string;
    email: string;
    subject: string;
    message: string;
}


const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit = (data) => {
        console.log(data);
        alert('Formulär skickat!');
    }

    return (
       <>  <NavBar/>
        <Container fluid className="container-fluid">
            <Row className="margin-bottom-top">
                <Col lg="12">
                    <h2 className="welcome-title">Välkommen till städafint!</h2>
                    <h3 className="contact-title">Har du några frågor? Kontakta oss.</h3>

                    <p className="contact-description">
                        Vi har sammanställt svaren på de vanligaste frågorna i vår <a href="/faq">FAQ-sektion</a>. Om du inte hittar den information du söker,
                        eller om du önskar hjälp med att boka vår städtjänst, är det enklaste sättet att nå oss via e-post eller telefon.
                        Du kan även besöka oss personligen. Nedan finner du vår kontaktinformation samt öppettider:
                    </p>
                    <ul className="info-list">
                        <li>Email: <a href="mailto:booking@cleanbookings.com">booking@cleanbookings.com</a></li>
                        <li>Telefon: <span>555-CLEAN-ME-NOW</span></li>
                        <li>Mobil: <span>070-CLEAN-ME-NOW</span></li>
                        <li>Plats: <span>Stockholm HQ</span></li>
                        <li> Öppettider: MÅN-FRE, 8:00 - 15:00 </li>
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
                                    fieldError={errors.name}
                                    register={register}
                                    label="Meddelande"
                                    fieldName="message"
                                    inputType="textarea"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" className="form-group">
                                <button type="submit" className="submit-button">Skicka</button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Container>

       </>

    );
};

export default Contact;
