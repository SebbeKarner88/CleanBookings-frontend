import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import basic from '../../assets/images/basic-nobg.png';
import top from '../../assets/images/top-nobg.png';
import diamond from '../../assets/images/diamant-nobg.png';
import win from '../../assets/images/window-nobg.png';
import './CleaningCardStyles.css'


interface props {
    image: string,
    title: string,
    description: string,
    items: string[],
    price: string
}

function imgMapper(img:string) {
    if (img == 'basic')
        return basic;
    if (img == 'top')
        return top;
    if (img == 'diamond')
        return diamond;
    if (img == 'window')
        return win;
}

function CleaningCard({image, title, description, items, price} : props) {

    return (
        <>
        <Card className="cleaningCard">
            <Card.Img className="image" variant="top" src={imgMapper(image)}  />
            <Card.Body>
                <Card.Title className="cardTitle">{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {items.map((item: string, index: number ) => (
                    <ListGroup.Item className="cardList" key={index}>{item}</ListGroup.Item>))}
            </ListGroup>
            <Card.Footer>
                <small className="cardFooter">{price}</small>
            </Card.Footer>
        </Card>
        </>
    );
}

export default CleaningCard;