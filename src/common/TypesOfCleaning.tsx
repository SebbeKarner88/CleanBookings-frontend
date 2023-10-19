import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CleaningCard from "../components/ServicesView/CleaningCard.tsx";



const TypesOfCleaning = () => {
    const services = [
        {
            image: 'basic',
            title: 'BASIC',
            description: 'Basic Städning. Det mest prisvärda alternativet, Storsäljaren.',
            items: ['Dammsugning av alla ytor', 'Dammtorka möbler', 'Våttorka golv'],
            price: '795kr'
        },
        {
            image: 'top',
            title: 'TOP',
            description: 'En grundligare städning. Ett perfekt alternativ för dig som ska flytta.',
            items: ['Dammsugning av alla ytor', 'Dammtorka möbler', 'Våttorka golv', 'Rasta hunden', 'Kamma frun'],
            price: '1495kr'
        },
        {
            image: 'diamond',
            title: 'DIAMANT',
            description: 'Vår 100% steril garantistäd\nPerfekt för dig som ska utföra en operation i vardagsrummet.',
            items: ['Dammsugning av alla ytor', 'Dammtorka möbler', 'Våttorka golv', 'Städning av kök', 'Välta kon', 'Rensa fisken', 'Cykla hem'],
            price: '2495kr'
        },
        {
            image: 'window',
            title: 'FÖNSTER',
            description: 'En klassisk fönstertvätt.',
            items: ['Dammsugning av alla ytor', 'Dammtorka möbler', 'Våttorka golv'],
            price: '795kr'
        }
    ]

    return (
        <>
            <Container className="mt-5">
                <Row>
                    {services.map((service, index) => (
                        <Col md={3} key={index} className="mb-4">
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