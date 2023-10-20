import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {useEffect, useState} from "react";
import {getAllCleaners} from "../api/CustomerApi.ts";
import user from '../assets/images/user.png'
import '../styles/EmployeeCardGridStyles.css'

interface Icleaner {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string
}

function EmployeeCardGrid() {

    const [cleaners, setCleaners] = useState<Icleaner[]>([]);

    async function fetchCleaners() {
        try {
            const response = await getAllCleaners();
            if (response?.status == 200)
                return response.data;
            else
                return [];
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCleaners().then(data => {
            setCleaners(data);
        });
    }, []);

    return (
        <Row xs={1} md={2} xxl={3} className="g-1">
            {cleaners.map((cleaner, id) => (
                <Col key={id}>
                    <Card className="empCard">
                        <Card.Img variant="top" src={user} className="cardImage"/>
                        <Card.Body>
                            <Card.Title><strong>{cleaner.firstName + " " + cleaner.lastName}</strong></Card.Title>
                            <Card.Text>
                                <strong>Phone Number:</strong> {cleaner.phoneNumber} <br/>
                                <strong>Email:</strong> {cleaner.emailAddress}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default EmployeeCardGrid;