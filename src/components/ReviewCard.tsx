import { Card, Col, Container, Row } from "react-bootstrap"
import '../styles/ReviewCard.css'

const ReviewCard = () => {
    const reviews = [
        {
            image: 'basic',
            title: 'Tack',
            description: 'Jag som bara sitter vid datorn hela dagarna har aldrig tid eller lust att städa, därför passar Städa Fint mig perfekt. Alla mina colaburkar och take away kartonger är ett minne blott!',
            signature: 'Kim, programmerare'
        },
        {
            image: 'top',
            title: 'Imponerad',
            description: 'Inte ens jag kan städa lika fint.. och då har jag ändå några års erfarenhet. Rekommenderas varmt!',
            signature: 'Lisa, hemmafru'
        },
        {
            image: 'diamond',
            title: 'Förbaskat rent!',
            description: 'Städaren jobbade snabbt och diskret. Rummet såg ut som nytt när de var klara! Jag kan varmt rekommendera StädaFint!',
            signature: 'Hasse, motellägare'
        },
    ]

    return (
        <>
            <Container className="pt-5 px-5">
                <p className='header-title'>&nbsp; Ord från tidigare kunder</p>
                <Row xs={1} md={2} lg={3}>
                    {reviews.map((review, index) => (
                        <Col key={index} className="mb-5 d-flex align-items-stretch">
                            <Card className="reviewCard">
                                {/* <Card.Img className="image" variant="top" src={imgMapper(image)} /> */}
                                <Card.Body>
                                    <Card.Title className="reviewTitle">{review.title}</Card.Title>
                                    <Card.Text>
                                        {review.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="reviewFooter">{review.signature}</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default ReviewCard