import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import LogIn from '../components/LogIn';

const TypesOfCleaning = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const [ choice, setChoice ] = useState('')
    const services = [
        { title: 'Basic Cleaning', description: 'Basic cleaning - vi dammsuger, våttorkar och dammar hela ditt hem. 500:-' },
        { title: 'Top Cleaning', description: 'Full cleaning - allt som ingår i basic plus avtorkning av kök och badrum. 1000:-' },
        { title: 'Diamond Cleaing', description: 'Thorough cleaning with window cleaning included - allt som ingår i full plus grundlig rengöring av spis, ugn, microvågsugn, tvättmaskin. 1500:-' },
        { title: 'Window Cleaning', description: 'Putsning av alla fönster i fastigheten. Från 500:-' }
    ]

    const handleChoice = (choice: string) => {
        setChoice(choice)
        sessionStorage.setItem('choice', choice)

        if (isAuthenticated)
            location.assign('/booking-view')
        else
            location.assign('/login')
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
                                        onClick={() => handleChoice(service.title)}>Book</Button>
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