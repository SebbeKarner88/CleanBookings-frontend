import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z, } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCustomerData } from "../../api/CustomerApi";
import { FormField } from "./FormField";
import { AuthContext } from "../../context/AuthContext";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";


const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    streetAddress: z.string(),
    postalCode: z.string(),
    city: z.string(),
    phoneNumber: z.string(),
    emailAddress: z.string(),
});

type FormData = z.infer<typeof schema>;

type FieldValues = {
    firstName?: string;
    lastName?: string;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    phoneNumber?: string;
    emailAddress?: string;
};

const FormEditCustomerData = () => {
    const { customerId } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigation = useNavigate();
    const location = useLocation();
    const values: FieldValues = location.state || {};


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        try {
            const response = await updateCustomerData(customerId, data);
            if (response.status === 200) {
                setModalVisible(true);
            } else {
                setErrorMessage("Something went wrong, try again.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("error");
        }
    };

    return (
        <>
            <h1>Editing customer {values.firstName + " " + values.lastName}</h1>
            <h3>Customer ID: {customerId}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <FormField
                            fieldName="firstName"
                            label="First name"
                            inputType="text"
                            defaultValue={values.firstName}
                            fieldError={errors.firstName}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="lastName"
                            label="Last name"
                            inputType="text"
                            defaultValue={values.lastName}
                            fieldError={errors.lastName}
                            customError={errorMessage}
                            register={register}
                        />
                    </div>
                    <div className="col-md-12">
                        <FormField
                            fieldName="streetAddress"
                            label="Street Address"
                            inputType="text"
                            defaultValue={values.streetAddress}
                            fieldError={errors.streetAddress}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="postalCode"
                            label="Postal Code"
                            inputType="text"
                            defaultValue={values.postalCode}
                            fieldError={errors.postalCode}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="city"
                            label="City"
                            inputType="text"
                            defaultValue={values.city}
                            fieldError={errors.city}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="phoneNumber"
                            label="Phone Number"
                            inputType="text"
                            defaultValue={values.phoneNumber}
                            fieldError={errors.phoneNumber}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="emailAddress"
                            label="Email Address"
                            inputType="email"
                            defaultValue={values.emailAddress}
                            fieldError={errors.emailAddress}
                            register={register}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-dark w-100">
                    Update Customer Data
                </button>
                <button
                    type="button"
                    className="btn btn-outline-danger w-100 mt-3"
                    onClick={() => navigation("/my-pages")}
                >
                    Cancel
                </button>
            </form>
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
                            navigation("/my-pages");
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
