import { Card, Col, Row } from "react-bootstrap"
import { services } from "../../utils/services"

export const TypesOfServices = () => {
    return (
        <>
        <Row xs={1} md={2} lg={4}>
                        {services.map((service, index) => (
                            <Col key={index} className="mb-5 d-flex align-items-stretch text-center">
                                <Card style={{ backgroundColor: 'var(--beige)', width: '100%' }} >
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
        </>
    )
}