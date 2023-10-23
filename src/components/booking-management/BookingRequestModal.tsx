import {Button, Col, Modal, Row, Spinner} from "react-bootstrap";

type Request = {
    type: string;
    date: string;
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
    const body = (
        <>
            <h2 className="fs-5 mb-4">
                Vill du boka följande städning?
            </h2>

            <Row>
                <Col md={6}>
                    <h2 className="fs-5 fw-bold">
                        Datum
                    </h2>
                    <p>
                        {request?.date}
                    </p>
                </Col>
                <Col md={6}>
                    <h2 className="fs-5 fw-bold">
                        Typ av städning
                    </h2>
                    <p>
                        {request?.type}
                    </p>
                </Col>
            </Row>

            <h2 className="fs-5 fw-bold">
                Meddelande
            </h2>
            <p>
                {
                    request?.message
                        ? request.message
                        : "Inget meddelande"
                }
            </p>
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
                {
                    isAssigning
                        ? <Spinner
                            as="span"
                            animation="border"
                            role="status"
                            aria-hidden="true"
                            aria-label={"Sending request..."}
                        />
                        : body
                }
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
                        >
                            Boka
                        </Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}