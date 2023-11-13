import {useContext, useState} from 'react'
import {FieldValues, useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {bookService} from "../../api/CustomerApi.ts";
import {FormField} from "./FormField.tsx";
import {AuthContext} from '../../context/AuthContext.tsx';
import {Button, Card, Col, Row} from 'react-bootstrap';
import BookingConfirmationModal from "../modals/BookingConfirmationModal.tsx";
import BookingRequestModal from "../modals/BookingRequestModal.tsx";
import {useNavigate} from "react-router-dom";
import {services} from '../../utils/services.ts';

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

const serviceOptions: option[] = [
    {value: "BASIC", label: "BASIC-städning"},
    {value: "TOPP", label: "TOPP-städning"},
    {value: "DIAMOND", label: "DIAMANT-städning"},
    {value: "WINDOW", label: "Fönsterputsning"}
]

const BookingForm = () => {
    const {customerId} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
    const closeConfirmationModal = () => setShowConfirmationModal(false);
    const closeRequestModal = () => setShowRequestModal(false);
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    const [requestData, setRequestData] = useState<Request | null>(null);
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false)

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
                if (response?.status == 201) {
                    setIsSendingRequest(false);
                    closeRequestModal();
                    // setShowConfirmationModal(true);
                    console.log(response.data.html_snippet);
                    navigate("/checkout", {state: {snippet: response.data.html_snippet}});
                } else {
                    setIsSendingRequest(false);
                    closeRequestModal();
                    alert(response?.data.message);
                }
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
                {/* <label>Vilken typ av städtjänst önskar du boka?</label>
                <Row xs={1} md={2} lg={4}>
                    {services.map((service, index) => (
                        <Col key={index} className="mb-5 text-center">
                            <input
                                {...register("type")}
                                type="radio"
                                name="type"
                                style={{ display: 'none' }}
                                value={service.type} />
                            <Card                                                                       // OBS FEL. MARKERAR ALLA KORT
                                style={{ backgroundColor: 'var(--beige)', width: '100%', cursor: 'pointer', border: isActive ? '2px solid black' : 'none' }}
                                onClick={() => {
                                    // NÅN LOGIC HÄR FÖR ATT SKICKA MED TYPE TILL HANDLESUBMIT??
                                    setIsActive(true)
                                    console.log(service.type)
                                }}>
                                <Card.Body>
                                    <Card.Title className="cardTitle">
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
                    ))}
                </Row> */}

                <FormField
                    fieldName="type"
                    label="Val av städtjänst"
                    labelDescription="Vilken typ av städtjänst önskar du boka?"
                    inputType="radio"
                    options={serviceOptions}
                    fieldError={errors.type}
                    register={register}
                />

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
        </>
    )
}

export default BookingForm