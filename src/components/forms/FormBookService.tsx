import {useContext, useState} from 'react'
import {FieldValues, useForm} from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {bookService} from "../../api/CustomerApi.ts";
import {useNavigate} from "react-router-dom";
import {FormField} from "./FormField.tsx";
import {AuthContext} from '../../context/AuthContext.tsx';
import {Button, Modal, Spinner} from 'react-bootstrap';

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

const BookingForm = () => {
    const {customerId, name} = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => setModalVisible(false);
    const [isAssigning, setIsAssigning] = useState(false);
    const navigation = useNavigate();

    async function onSubmit(data: FieldValues) {
        setIsAssigning(true);
        try {
            const response = await bookService(
                customerId,
                data.type,
                data.date,
                data.message
            );
            if (response?.status == 201) {
                setIsAssigning(false);
                setModalVisible(true);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
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

                {/*  <div className="col-md-6">
                    <FormField
                        fieldName="cleaner"
                        label="Cleaner"
                        labelDescription="Who would you like to perform the job?"
                        inputType="radio"
                        options={[ "Angelina", "Sebastian", "Jimmy", "Georgios", "Joachim", "Jonas" ]}
                        fieldError={errors.type}
                        register={register}
                        value={selectedCleaner}
                    />
                </div> */}

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


                {/** TODO: Add payment options */}
                        <button
                            type="submit"
                            className="btn btn-dark-purple w-100 my-3">
                            {
                                isAssigning
                                ? <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        aria-label={"Sending request..."}
                                    />
                                : "Boka din städning"
                            }
                        </button>
            </form>

            <Modal
                show={modalVisible}
                onHide={closeModal}
                fullscreen="md-down"
            >
                <Modal.Header
                    className="bg-secondary-subtle"
                    closeButton
                >
                    <Modal.Title className="fw-bold">
                        Bokningsbekräftelse
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-secondary-subtle">
                    <p>Tack för din bokning {name}!</p>
                    <p>Du kommer snart att få en bekräftelse på din bokade städning via e-post.</p>
                </Modal.Body>
                <Modal.Footer className="bg-secondary-subtle">
                    <Button
                        variant="dark"
                        className="btn-dark-purple"
                        onClick={() => navigation("/my-pages")}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BookingForm