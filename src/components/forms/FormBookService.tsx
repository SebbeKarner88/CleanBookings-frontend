import { useState } from 'react'
import { FieldValues, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { bookService } from "../../api/CustomerApi.ts";
import { Link, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FormField } from "./FormField.tsx";
import MyModal from '../../common/MyModal.tsx';

const schema = z.object({
    firstName: z
        .string()
        .nonempty({ message: "First name is required." }),
    lastName: z
        .string()
        .nonempty({ message: "Last name is required." }),
    streetAddress: z
        .string()
        .nonempty({ message: "Street address is required." }),
    postalCode: z
        .string()
        .regex(/\d/, { message: "Please only input numbers with no white spaces." })
        .min(5, { message: "Postal code must be a minimum of 5 numbers." })
        .max(5, { message: "Postal code must be a maximum of 5 numbers (with no white spaces)." }),
    city: z
        .string()
        .nonempty({ message: "City is required." }),
    phoneNumber: z
        .string()
        .nonempty({ message: "Phone number is required." })
        .regex(/^[0-9+\-\s]*$/, {
            message: "Invalid phone number format. Only numbers (0-9), +, -, and white space are allowed.",
        }),
    emailAddress: z
        .string()
        .nonempty({ message: "Email is required." })
        .email({ message: "Please provide a valid email address." }),
    /* password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." })
        .regex(/\d/, { message: "Password must contain at least one digit [0-9]." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter [A-Z]" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter [a-z]" }),
    confirmPassword: z
        .string(),
    terms: z.boolean().refine(value => value, {
        message: "You must accept the terms and conditions to be able to register an account." 
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: [ "confirmPassword" ],*/
});

type FormData = z.infer<typeof schema>;


const BookingForm = () => {
    const [ modalVisible, setModalVisible ] = useState(false)

    /* TODO: add logic with fetch for booking a service */
    /* TODO: add logic to check if user is logged in before making booking possible */
    /* IS IT NECCESSARY TO HAVE THE CUSTOMER FILL EVERYTHING OUT (ADDRESS ETC) IF THEY ARE LOGGED IN? */

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const navigation = useNavigate();

    function onSubmit(data: FieldValues) {
        bookService(
            data.customerId,
            data.type,
            data.date,
            data.message

        ).then(response => {
            if (response?.status == 201) {
                // Set data if needed
                navigation("/")
            }
        });
    }

    return (
        <form className="my-3 my-md-5 px-4 text-start"
            onSubmit={handleSubmit(onSubmit)}>
            <h2 className="my-3 fw-bold text-primary-emphasis">Book a service</h2>
            <h3 className="my-3 fw-bold text-primary-emphasis">Contact details</h3>
            <div className="row">
                <div className="col-md-6">
                    <FormField
                        fieldName="firstName"
                        label="First name"
                        inputType="text"
                        fieldError={errors.firstName}
                        register={register}
                    />
                </div>
                <div className="col-md-6">
                    <FormField
                        fieldName="lastName"
                        label="Last name"
                        inputType="text"
                        fieldError={errors.lastName}
                        register={register}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FormField
                        fieldName="streetAddress"
                        label="Street address"
                        labelDescription="Street name and number"
                        inputType="text"
                        fieldError={errors.streetAddress}
                        register={register}
                    />
                </div>
                <div className="col-md-6">
                    <FormField
                        fieldName="postalCode"
                        label="Postal code"
                        labelDescription="No whitespaces allowed"
                        inputType="text"
                        fieldError={errors.postalCode}
                        register={register}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FormField
                        fieldName="city"
                        label="City"
                        inputType="text"
                        fieldError={errors.city}
                        register={register}
                    />
                </div>
                <div className="col-md-6">
                    <FormField
                        fieldName="phoneNumber"
                        label="Phone number"
                        inputType="tel"
                        fieldError={errors.phoneNumber}
                        register={register}
                    />
                </div>
            </div>
            <h3 className="my-3 fw-bold text-primary-emphasis">Account details</h3>
            <FormField
                fieldName="emailAddress"
                label="Email address"
                labelDescription="This will be used as your username"
                inputType="email"
                fieldError={errors.emailAddress}
                register={register}
            />
           {/*  <FormField
                fieldName="password"
                label="Password"
                labelDescription="Minimum of eight (8) chars, must contain at least one (1) uppercase and one (1) lowercase letter"
                inputType="password"
                fieldError={errors.password}
                register={register}
            />
            <FormField
                fieldName="confirmPassword"
                label="Confirm password"
                inputType="password"
                fieldError={errors.confirmPassword}
                register={register}
            />
            <div className="mb-3 form-check">
                {errors.terms && (
                    <p className="text-danger mt-1 mb-2"><BsExclamationCircle /> {errors.terms.message}</p>
                )}
                <input {...register('terms')} type="checkbox" className="form-check-input" id="terms" />
                <label className={errors.terms ? "form-check-label is-invalid" : "form-check-label"}
                    htmlFor="terms">I accept the <a href="">terms of service</a> and <a href="">privacy
                        policy</a></label>
            </div> */}
            <button type="submit" className="btn btn-outline-dark w-100" onClick={() => {
                        setModalVisible(!modalVisible)
                    }}>Book</button>
            <MyModal
                    modalVisible={modalVisible}
                    header='Thank you for booking!'
                    description='You will recieve a confirmation email shortly.'
                    onRequestClose={() => setModalVisible(!modalVisible)} />
            <div className="mt-3 d-flex gap-2 align-items-center">
                <VscAccount size={20} />
                <strong>Already have an account? </strong><Link to="/login">Sign in</Link>
            </div>
        </form>
    )
}

export default BookingForm