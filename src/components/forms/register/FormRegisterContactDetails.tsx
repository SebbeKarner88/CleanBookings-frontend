import {FieldValues, useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {VscAccount} from "react-icons/vsc";
import {FormField} from "../FormField.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFormContext} from "../../../context/FormContext.tsx";

const schema = z.object({
    firstName: z
        .string()
        .nonempty({message: "First name is required."}),
    lastName: z
        .string()
        .nonempty({message: "Last name is required."}),
    ssn: z
        .string()
        .min(11, {message: "Invalid SSN. Should contain at least 10 numbers."})
        .max(11, {message: "Should be in format YYMMDD-XXXX"})
        .includes("-", {message: "Should be in format YYMMDD-XXXX"})
        .nonempty({message: "Social security number is required."}),
    streetAddress: z
        .string()
        .nonempty({message: "Street address is required."}),
    postalCode: z
        .string()
        .regex(/\d/, {message: "Please only input numbers with no white spaces."})
        .min(5, {message: "Postal code must be a minimum of 5 numbers."})
        .max(5, {message: "Postal code must be a maximum of 5 numbers (with no white spaces)."}),
    city: z
        .string()
        .nonempty({message: "City is required."}),
    phoneNumber: z
        .string()
        .nonempty({message: "Phone number is required."})
        .regex(/^[0-9+\-\s]*$/, {
            message: "Invalid phone number format. Only numbers (0-9), +, -, and white space are allowed.",
        })
});

type FormData = z.infer<typeof schema>;

interface IFormRegisterContactDetails {
    onNext: () => void;
}

export function FormRegisterContactDetails({onNext}: IFormRegisterContactDetails) {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const {formData, setFormData} = useFormContext();

    function saveData(data: FieldValues) {
        setFormData({...formData, ...data});
        onNext();
    }

    return (
        <form className="my-3 my-md-5 px-4 text-start" onSubmit={handleSubmit(saveData)}>
            <h2 className="my-3 fw-bold text-primary-emphasis">
                Contact details
            </h2>

            <FormField
                fieldName="firstName"
                label="First name"
                inputType="text"
                fieldError={errors.firstName}
                register={register}
            />

            <FormField
                fieldName="lastName"
                label="Last name"
                inputType="text"
                fieldError={errors.lastName}
                register={register}
            />

            <FormField
                fieldName="ssn"
                label="Social security number"
                labelDescription={"YYMMDD-XXXX"}
                inputType="text"
                fieldError={errors.ssn}
                register={register}
            />

            <FormField
                fieldName="streetAddress"
                label="Street address"
                labelDescription="Street name and number"
                inputType="text"
                fieldError={errors.streetAddress}
                register={register}
            />

            <FormField
                fieldName="postalCode"
                label="Postal code"
                labelDescription="No whitespaces allowed"
                inputType="text"
                fieldError={errors.postalCode}
                register={register}
            />

            <FormField
                fieldName="city"
                label="City"
                inputType="text"
                fieldError={errors.city}
                register={register}
            />

            <FormField
                fieldName="phoneNumber"
                label="Phone number"
                inputType="tel"
                fieldError={errors.phoneNumber}
                register={register}
            />

            <button type="submit" className="btn btn-primary w-100">
                Next
            </button>

            <div className="mt-3 d-flex gap-2 align-items-center">
                <VscAccount size={20}/>
                <strong>Already have an account? </strong><Link to="/login">Sign in</Link>
            </div>
        </form>
    );
}