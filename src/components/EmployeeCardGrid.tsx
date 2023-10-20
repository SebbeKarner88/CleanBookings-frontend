import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {useEffect, useState} from "react";
import {getAllCleaners} from "../api/CustomerApi.ts";

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
        <Row xs={1} md={2} className="g-4">
            {cleaners.map((cleaner, id) => (
                <Col key={id}>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160"/>
                        <Card.Body>
                            <Card.Title>{cleaner.firstName + " " + cleaner.lastName}</Card.Title>
                            <Card.Text>
                                Phone Number: {cleaner.phoneNumber} <br/>
                                Email Adress: {cleaner.emailAddress}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default EmployeeCardGrid;