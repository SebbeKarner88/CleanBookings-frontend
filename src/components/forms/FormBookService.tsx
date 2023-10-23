import {useContext, useState} from 'react'
import {FieldValues, useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {bookService} from "../../api/CustomerApi.ts";
import {FormField} from "./FormField.tsx";
import {AuthContext} from '../../context/AuthContext.tsx';
import {Button} from 'react-bootstrap';
import BookingConfirmationModal from "../booking-management/BookingConfirmationModal.tsx";
import BookingRequestModal from "../booking-management/BookingRequestModal.tsx";

const schema = z.object({
    type: z
        .enum(["BASIC", "TOPP", "DIAMOND", "WINDOW"]),
    date: z
        .string()
        .nonempty({message: "Datum är ett obligatoriskt fält."}),
    message: z
        .string()
});

type FormData = z.infer<typeof schema>;

type Request = {
    type: string;
    date: string;
    message?: string | undefined;
}

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

    async function sendRequest() {
        if (requestData != null) {
            setIsSendingRequest(true);
            try {
                const response = await bookService(
                    customerId,
                    requestData.type,
                    requestData.date,
                    requestData.message
                );
                if (response?.status == 201) {
                    setIsSendingRequest(false);
                    closeRequestModal();
                    setShowConfirmationModal(true);
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
        setRequestData({type: data.type, date: data.date, message: data.message});
        setShowRequestModal(true);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    fieldName="date"
                    label="Datum för utförandet"
                    inputType="date"
                    fieldError={errors.date}
                    register={register}
                />

                <FormField
                    fieldName="type"
                    label="Val av städtjänst"
                    labelDescription="Vilken typ av städtjänst önskar du boka?"
                    inputType="radio"
                    options={["BASIC", "TOPP", "DIAMOND", "WINDOW"]}
                    fieldError={errors.type}
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