import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import basic from '../../assets/images/basic-nobg.png';
import top from '../../assets/images/top-nobg.png';
import diamond from '../../assets/images/diamant-nobg.png';
import win from '../../assets/images/window-nobg.png';
import '../../styles/CleaningCard.css'
import {Button} from "react-bootstrap";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

interface props {
    image: string,
    title: string,
    description: string,
    items: string[],
    price: string
}

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

function CleaningCard({image, title, description, items, price}: props) {
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = (type: string) => navigate(isAuthenticated ? "/booking-view" : "/login", {state: type});

    return (
        <>
            <Card className="cleaningCard">
                <Card.Img className="image" variant="top" src={imgMapper(image)}/>
                <Card.Body>
                    <Card.Title className="cardTitle">
                        {title}
                    </Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {items.map((item: string, index: number) => (
                        <ListGroup.Item className="cardList" key={index}>{item}</ListGroup.Item>))}
                </ListGroup>
                {
                    title === "BASIC" &&
                    <div className="bg-success text-white">
                        <h2 className="fs-5 fw-bold my-2">
                            Mest sålda!
                        </h2>
                    </div>
                }
                <Card.Footer>
                    <small className="cardFooter">
                        {price}
                        <hr />
                        <Button
                            variant="primary"
                            size={"lg"}
                            className="btn-dark-purple w-100 fw-bold"
                            onClick={() => handleClick(title)}
                        >
                            BOKA NU!
                        </Button>
                    </small>
                </Card.Footer>
            </Card>
        </>
    );
}

export default CleaningCard;