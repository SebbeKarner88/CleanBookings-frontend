import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import basic from '../../assets/images/basic-nobg.png';
import top from '../../assets/images/top-nobg.png';
import diamond from '../../assets/images/diamant-nobg.png';
import win from '../../assets/images/window-nobg.png';
import '../../styles/CleaningCard.css'
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {services} from '../../utils/services.ts';

function imgMapper(img: string) {
    if (img == 'basic')
        return basic;
    if (img == 'top')
        return top;
    if (img == 'diamond')
        return diamond;
    if (img == 'window')
        return win;
}

function CleaningCard() {
    const navigate = useNavigate();
    const handleClick = (type: string) => {
        const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
        if (isAuthenticated) {
            navigate(
                "/booking-view",
                {
                    state: {
                        type: getValueFromTitle(type)
                    }
                }
            )
        } else {
            sessionStorage.setItem("prevPage", location.pathname);
            navigate("/login");
        }
    };

    function getValueFromTitle(title: string) {
        switch (title) {
            case "DIAMANT":
                return "DIAMOND";
            case "TOPP":
                return "TOPP";
            case "BASIC":
                return "BASIC";
            case "FÖNSTER":
                return "WINDOW";
        }
    }

    return (
        <>
            <Container className="pt-5 px-5">
                <Row xs={1} md={2} lg={4}>
                    {services.map((service, index) => (
                        <Col key={index} className="mb-5 d-flex align-items-stretch">
                            <Card className="cleaningCard">
                                <Card.Img className="image" variant="top" src={imgMapper(service.image)}/>
                                <Card.Body>
                                    <Card.Title className="cardTitle">
                                        {service.title}
                                    </Card.Title>
                                    <Card.Text>
                                        {service.description}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    {service.items.map((item, index) => (
                                        <ListGroup.Item className="cardList" key={index}>{item}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                                {
                                    service.title === "BASIC" &&
                                    <div className="bg-success text-white">
                                        <h2 className="fs-5 fw-bold my-2">
                                            Mest sålda!
                                        </h2>
                                    </div>
                                }
                                <Card.Footer>
                                    <small className="cardFooter">
                                        {service.price}
                                        <hr/>
                                        <Button
                                            variant="primary"
                                            size={"lg"}
                                            className="btn-dark-purple w-100 fw-bold"
                                            onClick={() => handleClick(service.title)}>
                                            BOKA NU
                                        </Button>
                                    </small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default CleaningCard;