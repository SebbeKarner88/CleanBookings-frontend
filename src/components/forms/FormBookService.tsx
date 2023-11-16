import {useState} from 'react'
import {FieldValues, useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {bookService} from "../../api/CustomerApi.ts";
import {FormField} from "./FormField.tsx";
import {Button, Card, Col, Row} from 'react-bootstrap';
import BookingConfirmationModal from "../modals/BookingConfirmationModal.tsx";
import BookingRequestModal from "../modals/BookingRequestModal.tsx";
import {useNavigate} from "react-router-dom";
import {services} from '../../utils/services.ts';
import ErrorModal from "../modals/ErrorModal.tsx";

const schema = z.object({
    type: z
        .enum(["BASIC", "TOPP", "DIAMOND", "WINDOW"]),
    date: z
        .string()
        .nonempty({message: "Datum är ett obligatoriskt fält."}),
    timeslot: z
        .enum(["MORNING", "AFTERNOON", "EVENING"]),
    message: z
        .string()
});

type FormData = z.infer<typeof schema>;

type Request = {
    type: string;
    date: string;
    timeslot: string;
    message?: string | undefined;
}

type option = {
    value: string,
    label: string
};

const timeslotOptions: option[] = [
    {value: "MORNING", label: "8-12"},
    {value: "AFTERNOON", label: "13-16"},
    {value: "EVENING", label: "17-20"}
]

interface IBookingForm {
    selectedService: "BASIC" | "TOPP" | "DIAMOND" | "WINDOW";
}

const BookingForm = ({selectedService}: IBookingForm) => {
    const customerId = sessionStorage.getItem("customerId");
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const closeConfirmationModal = () => setShowConfirmationModal(false);
    const closeRequestModal = () => setShowRequestModal(false);
    const closeErrorModal = () => setShowErrorModal(false);
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [requestData, setRequestData] = useState<Request | null>(null);
    const navigate = useNavigate();

    async function sendRequest() {
        if (requestData != null) {
            setIsSendingRequest(true);
            try {
                const response = await bookService(
                    customerId,
                    requestData.type,
                    requestData.date,
                    requestData.timeslot,
                    requestData.message
                );
                if (response.status === 201) {
                    // setShowConfirmationModal(true);
                    navigate("/checkout", {state: {snippet: response.data.html_snippet}});
                } else if (response.response.status === 400) {
                    setShowErrorModal(true);
                } else {
                    alert("Något gick fel!");
                }
                setIsSendingRequest(false);
                closeRequestModal();
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function onSubmit(data: FieldValues) {
        setRequestData({type: data.type, date: data.date, timeslot: data.timeslot, message: data.message});
        setShowRequestModal(true);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-label fw-semibold mb-3">Vilken tjänst vill du boka?</label>
                <Row xs={2} md={2} lg={4}>
                    {services.map((service, index) => (
                        <label htmlFor={service.type}>
                            <Col key={index} className="mb-4 text-center">
                                <input
                                    {...register("type")}
                                    type="radio"
                                    name="type"
                                    value={service.type}
                                    key={service.type}
                                    id={service.type}
                                    className='card-input-element'
                                    defaultChecked={service.type === selectedService}
                                />
                                <Card className='card-input'>
                                    <Card.Body>
                                        <Card.Title className="cardTitle mb-2">
                                            {service.title}
                                        </Card.Title>
                                        <Card.Text>
                                            {service.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="cardFooter">
                                            {service.price}
                                        </small>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </label>
                    ))}
                </Row>


                <FormField
                    fieldName="timeslot"
                    label="Tid"
                    labelDescription="När vill du att vi ska städa?"
                    inputType="radio"
                    options={timeslotOptions}
                    fieldError={errors.timeslot}
                    register={register}
                />

                <FormField
                    fieldName="date"
                    min={new Date().toLocaleDateString()}
                    label="Datum för utförandet"
                    inputType="date"
                    fieldError={errors.date}
                    register={register}
                />

                <div>
                    <label htmlFor="message" className="form-label fw-semibold">
                        Meddelande (frivilligt)
                        <div className="form-text">
                            Beskriv eventuella önskemål här.
                        </div>
                    </label>
                    {
                        errors.message &&
                        <div className="text-danger my-1">
                            {errors.message.message}
                        </div>
                    }
                    <textarea
                        {...register("message")}
                        className={errors.message ? "form-control is-invalid" : "form-control"}
                        id="message"
                        rows={4}
                    />
                </div>
                <Button
                    variant="dark"
                    size="lg"
                    type="submit"
                    className="btn-dark-purple w-100 my-3">
                    Boka din städning
                </Button>
            </form>
            <BookingRequestModal
                show={showRequestModal}
                onHide={closeRequestModal}
                handleRequest={sendRequest}
                request={requestData}
                isAssigning={isSendingRequest}
            />
            <BookingConfirmationModal
                show={showConfirmationModal}
                onHide={closeConfirmationModal}
            />
            <ErrorModal
                onShow={showErrorModal}
                onClose={closeErrorModal}
                message="Ett städjobb av denna typ har redan bokats detta datum."
            />
        </>
    )
}

export default BookingForm