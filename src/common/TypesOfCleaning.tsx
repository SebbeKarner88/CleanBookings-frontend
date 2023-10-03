import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'

const TypesOfCleaning = () => {
    const [choice, setChoice] = useState('')
    const services = [
        { title: 'Basic Cleaning', description: 'Basic cleaning with no extras' },
        { title: 'Top Cleaning', description: 'Full cleaning' },
        { title: 'Diamond Cleaing', description: 'Thorough cleaning with window cleaning included' },
        { title: 'Window Cleaning', description: 'Crystal clear' }
    ]

    const handleChoice = (choice: string) => {
        setChoice(choice)
        sessionStorage.setItem('choice', choice)

        location.assign('/booking-view')
    }

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
                                    <Button
                                        variant="outline-dark"
                                        onClick={() => handleChoice(service.title)}>Välj</Button>
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