import NavBar from "../common/NavBar";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Services() {
    const services = [
        { title: 'Basic Städning', description: 'Grundläggande städning' },
        { title: 'Topp Städning', description: 'Ingående städning' },
        { title: 'Diamant Städning', description: 'Heltäckande städning' },
        { title: 'Fönstertvätt', description: 'Cristal clear' }
    ];

    /* TODO: create logic for sending customer to booking page when clicking a service */

    return (
        <>
            <NavBar />
            <Container className="mt-5">
                <Row>
                    {services.map((service, index) => (
                        <Col md={3} key={index} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{service.title}</Card.Title>
                                    <Card.Text>{service.description}</Card.Text>
                                    <Button variant="primary">Välj</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Services;
