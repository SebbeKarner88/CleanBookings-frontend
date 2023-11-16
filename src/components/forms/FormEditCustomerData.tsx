import {FormField} from "./FormField.tsx";
import {Button} from "react-bootstrap";
import {z} from "zod";
import {useLocation} from "react-router-dom";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateCustomerData} from "../../api/CustomerApi.ts";
import {useState} from "react";
import UpdateCustomerDataSuccessModal from "../modals/UpdateCustomerDataSuccessModal.tsx";

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

export default function FormEditCustomerData() {
    const customerId = sessionStorage.getItem("customerId");
    const location = useLocation();
    const values = location.state;
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const [showModal, setShowModal] = useState<boolean>(false);
    const closeModal = () => setShowModal(false);

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
                setShowModal(true)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    fieldName="firstName"
                    label="Förnamn"
                    inputType="text"
                    defaultValue={values.firstName}
                    fieldError={errors.firstName}
                    register={register}
                />

                <FormField
                    fieldName="lastName"
                    label="Efternamn"
                    inputType="text"
                    defaultValue={values.lastName}
                    fieldError={errors.lastName}
                    register={register}
                />

                <FormField
                    fieldName="streetAddress"
                    label="Gatuadress"
                    inputType="text"
                    defaultValue={values.streetAddress}
                    fieldError={errors.streetAddress}
                    register={register}
                />


                <div className="row">
                    <div className="col-md-6">
                        <FormField
                            fieldName="postalCode"
                            label="Postkod"
                            inputType="text"
                            defaultValue={values.postalCode}
                            fieldError={errors.postalCode}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="city"
                            label="Postort"
                            inputType="text"
                            defaultValue={values.city}
                            fieldError={errors.city}
                            register={register}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormField
                            fieldName="phoneNumber"
                            label="Telefonnummer"
                            inputType="text"
                            defaultValue={values.phoneNumber}
                            fieldError={errors.phoneNumber}
                            register={register}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormField
                            fieldName="emailAddress"
                            label="Epostadress"
                            inputType="email"
                            defaultValue={values.emailAddress}
                            fieldError={errors.emailAddress}
                            register={register}
                        />
                    </div>
                </div>

                <Button type="submit" className="btn-dark-purple w-100">
                    Uppdatera dina uppgifter
                </Button>
            </form>

    <UpdateCustomerDataSuccessModal onShow={showModal} onClose={closeModal} />
    </>
    )
}