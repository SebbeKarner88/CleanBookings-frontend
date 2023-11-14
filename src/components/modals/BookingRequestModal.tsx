import {Button, Col, Modal, Row} from "react-bootstrap";

type Request = {
    type: string;
    date: string;
    timeslot: string;
    message?: string | undefined;
}

interface IBookingRequestModal {
    show: boolean;
    onHide: () => void;
    handleRequest: () => void;
    request: Request | null;
    isAssigning: boolean;
}

export default function BookingRequestModal({show, onHide, handleRequest, request, isAssigning}: IBookingRequestModal) {
    function translateJobType(type: string | undefined) {
        switch (type) {
            case "BASIC":
                return "BASIC-städning";
            case "TOPP":
                return "TOPP-städning";
            case "DIAMOND":
                return "DIAMANT-städning";
            case "WINDOW":
                return "Fönsterputs";
        }
    }

    function translateTimeslot(timeslot: string | undefined) {
        switch (timeslot) {
            case "MORNING":
                return "8-12";
            case "AFTERNOON":
                return "13-16";
            case "EVENING":
                return "17-20";
        }
    }

    const body = (
        <>
            <Row>
                <Col md={6}>
                    <h3 className="fs-5 fw-bold">
                        Datum
                    </h3>
                    <p>
                        {request?.date}
                    </p>
                </Col>
                <Col md={6}>
                    <h3 className="fs-5 fw-bold">
                        Typ av städning
                    </h3>
                    <p>
                        {translateJobType(request?.type)}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h3 className="fs-5 fw-bold">
                        Tid
                    </h3>
                    <p>
                        {translateTimeslot(request?.timeslot)}
                    </p>
                </Col>
                <Col md={6}>
                    <h3 className="fs-5 fw-bold">
                        Meddelande
                    </h3>
                    <p>
                        {
                            request?.message
                                ? request.message
                                : "Inget meddelande"
                        }
                    </p>
                </Col>
            </Row>
        </>
    )

    return (
        <Modal
            show={show}
            onHide={onHide}
            scrollable={true}
            fullscreen="md-down"
        >
            <Modal.Header
                closeButton
                closeVariant="white"
                className="bg-dark-purple text-beige border-0"
            >
                <Modal.Title className="fw-bold">
                    Bekräfta din bokning
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light-brown">
                {body}
            </Modal.Body>
            <Modal.Footer className="bg-light-brown border-0">
                <Row>
                    <Col>
                        <Button
                            variant="danger"
                            onClick={onHide}
                        >
                            Avbryt
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="dark"
                            className="btn-dark-purple"
                            onClick={handleRequest}
                            disabled={isAssigning}
                        >
                            {isAssigning ? "Bokar..." : "Boka"}
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}