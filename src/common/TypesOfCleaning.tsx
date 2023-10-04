import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TypesOfCleaning = () => {
    const services = [
        { title: 'Basic Cleaning', description: 'Basic cleaning - vi dammsuger, våttorkar och dammar hela ditt hem. 500:-' },
        { title: 'Top Cleaning', description: 'Full cleaning - allt som ingår i basic plus avtorkning av kök och badrum. 1000:-' },
        { title: 'Diamond Cleaning', description: 'Thorough cleaning with window cleaning included - allt som ingår i full plus grundlig rengöring av spis, ugn, microvågsugn, eventuell tvättmaskin samt fönstertvätt. 1500:-' },
        { title: 'Window Cleaning', description: 'Putsning av alla fönster i fastigheten. Från 500:-' }
    ]

    return (
        <>
            <Container className="mt-5">
                <Row>
                    {services.map((service, index) => (
                        <Col md={3} key={index} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{service.title}</Card.Title>
                                    <Card.Text>{service.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default TypesOfCleaning