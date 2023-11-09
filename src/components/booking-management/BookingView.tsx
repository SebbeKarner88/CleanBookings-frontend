import NavBar from "../../common/NavBar.tsx"
import BookingForm from "../forms/FormBookService"
import { Footer } from "../../common/Footer.tsx";
import { Card, Col, Row } from "react-bootstrap";
import { services } from "../../utils/services.ts";

export default function BookingView() {

    return (
        <div className="min-vw-100 min-vh-100 bg-image">
            <NavBar />
            <h1 className="text-md-center fw-bold my-4 text-white">
                Boka en städning
            </h1>
            <div className="bg-light-brown container p-2 p-md-4 my-4 mb-5 rounded rounded-4">
                <div className="container text-start">
                    <Row xs={1} md={2} lg={4}>
                        {services.map((service, index) => (
                            <Col key={index} className="mb-5 d-flex align-items-stretch text-center">
                                <Card style={{ backgroundColor: 'var(--beige)', width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title className="cardTitle">
                                            {service.title}
                                        </Card.Title>
                                        <Card.Text>
                                            {service.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="cardFooter">
                                            {service.price}
                                        </small>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <BookingForm />
                </div>
            </div>
            <Footer />
        </div>
    )
}