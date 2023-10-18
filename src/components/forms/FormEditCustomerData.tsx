import {useContext, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {z,} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateCustomerData} from "../../api/CustomerApi";
import {FormField} from "./FormField";
import {AuthContext} from "../../context/AuthContext";
import {Button, Modal} from "react-bootstrap";
import {useNavigate, useLocation} from "react-router-dom";

const schema = z.object({
    firstName: z
        .string()
        .nonempty({message: "First name is required."}),
    lastName: z
        .string()
        .nonempty({message: "Last name is required."}),
    streetAddress: z
        .string()
        .nonempty({message: "Street address is required."}),
    postalCode: z
        .string()
        .nonempty({message: "Postal code is required."})
        .regex(/^\d{3}\s?\d{2}$|^\d{5}$/, {
            message: "Invalid postal code format. Only five digits, XXX XX or XXXXX format is allowed.",
        }),
    city: z
        .string()
        .nonempty({message: "City is required."}),
    phoneNumber: z
        .string()
        .regex(/^[0-9+\-\s]*$/, {
            message: "Invalid phone number format. Only numbers (0-9), +, -, and white space are allowed.",
        }),
    emailAddress: z
        .string()
        .nonempty({message: "Email is required."})
        .email({message: "Please provide a valid email address."}),
});

type FormData = z.infer<typeof schema>;

const FormEditCustomerData = () => {
    const {customerId} = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigate();
    const location = useLocation();
    const values = location.state;
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    async function onSubmit(data: FieldValues) {
        try {
            const response = await updateCustomerData(
                customerId,
                data.firstName != values.firstName ? data.firstName : null,
                data.lastName != values.lastName ? data.lastName : null,
                data.streetAddress != values.streetAddress ? data.streetAddress : null,
                data.postalCode != values.postalCode ? data.postalCode.replace(/\s/g, '') : null,
                data.city != values.city ? data.city : null,
                data.phoneNumber != values.phoneNumber ? data.phoneNumber : null,
                data.emailAddress != values.emailAddress ? data.emailAddress : null
            );
            if (response?.status == 200)
                setModalVisible(true)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="container bg-body-secondary my-3 p-3 p-md-4 rounded-4 text-start">
                <div className="d-flex flex-column justify-content-between">
                <h1 className="h1 fw-bold">
                    Editing customer
                </h1>
                <p className="h3 text-primary-emphasis">
                    {values.firstName + " " + values.lastName} ({values.customerId})
                </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                            <FormField
                                fieldName="firstName"
                                label="First name"
                                inputType="text"
                                defaultValue={values.firstName}
                                fieldError={errors.firstName}
                                register={register}
                            />

                            <FormField
                                fieldName="lastName"
                                label="Last name"
                                inputType="text"
                                defaultValue={values.lastName}
                                fieldError={errors.lastName}
                                register={register}
                            />

                            <FormField
                                fieldName="streetAddress"
                                label="Street Address"
                                inputType="text"
                                defaultValue={values.streetAddress}
                                fieldError={errors.streetAddress}
                                register={register}
                            />

                            <FormField
                                fieldName="postalCode"
                                label="Postal Code"
                                inputType="text"
                                defaultValue={values.postalCode}
                                fieldError={errors.postalCode}
                                register={register}
                            />

                            <FormField
                                fieldName="city"
                                label="City"
                                inputType="text"
                                defaultValue={values.city}
                                fieldError={errors.city}
                                register={register}
                            />

                            <FormField
                                fieldName="phoneNumber"
                                label="Phone Number"
                                inputType="text"
                                defaultValue={values.phoneNumber}
                                fieldError={errors.phoneNumber}
                                register={register}
                            />

                            <FormField
                                fieldName="emailAddress"
                                label="Email Address"
                                inputType="email"
                                defaultValue={values.emailAddress}
                                fieldError={errors.emailAddress}
                                register={register}
                            />

                    <button type="submit" className="btn btn-primary w-100 my-3">
                        Update Customer Data
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger w-100"
                        onClick={() => navigation("/gdpr-customer-data")}
                    >
                        Cancel
                    </button>
                </form>
            </div>
            <Modal
                show={modalVisible}
                onHide={() => setModalVisible(!modalVisible)}
                fullscreen="md-down"
            >
                <Modal.Header
                    className="bg-secondary-subtle"
                    closeButton
                >
                    <Modal.Title className="fs-6 fw-bold">
                        {"Update successful!"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>The data for customer {customerId} has been updated.</p>
                </Modal.Body>
                <Modal.Footer>

                    <Button
                        variant="primary"
                        onClick={() => {
                            setModalVisible(!modalVisible);
                            navigation("/myPages");
                        }}
                    >
                        Return to My Pages
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FormEditCustomerData;
