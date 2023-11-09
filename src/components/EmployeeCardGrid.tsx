import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from "react";
import { getAllCleaners } from "../api/CustomerApi.ts";
import user from '../assets/images/user.png'
import '../styles/EmployeeCardGridStyles.css'
import { FaPhone, FaEnvelopeSquare } from 'react-icons/fa'
import styled from 'styled-components'
import Carousel from 'react-bootstrap/Carousel';

interface Icleaner {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    emailAddress: string
}

function EmployeeCardGrid() {
    const [ cleaners, setCleaners ] = useState<Icleaner[]>([]);
    const [ show, setShow ] = useState(0);

    const handleSelect = (selectedShow: number) => {
        setShow(selectedShow);
    };

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

    const reduceCleaners = (acc: any, cur: any, index: number) => {
        const groupIndex = Math.floor(index / 3)
        if (!acc[ groupIndex ]) acc[ groupIndex ] = []
        acc[ groupIndex ].push(cur)
        return acc
    }

    return (
        <>
            <Carousel
                activeIndex={show}
                onSelect={handleSelect}
                interval={5000}>
                {cleaners.reduce(reduceCleaners, [])
                    .map((item: any, index: number) => (
                        <Carousel.Item key={index}>
                            <Row xs={1} md={2} lg={3} className="carousel">
                                {item.map((item: any, index: number) => {
                                    return (
                                        <Col key={index} className='d-flex align-items-stretch'>
                                            <Card className='empCard'>
                                                <Card.Img variant="top" src={user} className="cardImage" />
                                                <Card.Body>
                                                    <Card.Title className='fw-bold'>
                                                        {item.firstName + " " + item.lastName}
                                                    </Card.Title>
                                                    <Card.Text className="text-start">
                                                        <Phone /> {item.phoneNumber} <br />
                                                        <Envelope /> <a href={`mailto:${item.emailAddress}`} className="email-link">{item.emailAddress}</a>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Carousel.Item>
                    ))}
            </Carousel>
        </>
    );
}

export default EmployeeCardGrid;

const Phone = styled(FaPhone)`
  color: var(--dark-purple);
  margin-right: 10px;
  font-size: 18px;
  width: 2.25rem;
`;

const Envelope = styled(FaEnvelopeSquare)`
  color: var(--dark-purple);
  margin-right: 10px;
  font-size: 18px;
  width: 2.25rem;
`;