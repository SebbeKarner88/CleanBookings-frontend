import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CleaningCard from "./CleaningCard.tsx";



const TypesOfCleaning = () => {
    const services = [
        {
            image: 'diamond',
            title: 'DIAMANT',
            description: 'Vår 100% steril garantistäd\nPerfekt för dig som ska utföra en operation i vardagsrummet.',
            items: ['Dammsugning av alla ytor', 'Dammtorka möbler', 'Våttorka golv', 'Städning av kök', 'Välta kon', 'Rensa fisken' ],
            price: '2495kr'
        },
        {
            image: 'top',
            title: 'TOP',
            description: 'En grundligare städning. Ett perfekt alternativ för dig som ska flytta.',
            items: ['Dammsugning av alla ytor', 'Dammtorka möbler', 'Våttorka golv', 'Rasta hunden', 'Kamma frun'],
            price: '1495kr'
        },
        {
            image: 'basic',
            title: 'BASIC',
            description: 'Basic Städning. Det mest prisvärda alternativet, Storsäljaren.',
            items: ['Dammsugning av alla ytor', 'Dammtorka möbler', 'Våttorka golv'],
            price: '795kr'
        },
        {
            image: 'window',
            title: 'FÖNSTER',
            description: 'En klassisk fönstertvätt.',
            items: [],
            price: '795kr'
        }
    ]

    return (
        <>
            <Container className="pt-5 px-5">
                <Row xs={1} md={2} lg={4}>
                    {services.map((service, index) => (
                        <Col key={index} className="mb-5 d-flex align-items-stretch">
                            <CleaningCard
                                image={service.image}
                                title={service.title}
                                description={service.description}
                                items={service.items}
                                price={service.price}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default TypesOfCleaning