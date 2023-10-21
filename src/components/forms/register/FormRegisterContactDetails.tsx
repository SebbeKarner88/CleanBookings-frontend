import {FieldValues, useForm} from "react-hook-form";
import {FormField} from "../FormField.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFormContext} from "../../../context/RegisterFormContext.tsx";
import ContinueButton from "./ContinueButton.tsx";

const schema = z.object({
    streetAddress: z
        .string()
        .nonempty({message: "Street address is required."}),
    postalCode: z
        .string()
        .regex(/^\d{3}\s?\d{2}$|^\d{5}$/, {
            message: "Invalid postal code format. Only five digits, XXX XX or XXXXX format is allowed.",
        }),
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
            <h2 className="my-3 fw-bold text-dark-purple">
                Kontaktuppgifter
            </h2>

            <FormField
                fieldName="streetAddress"
                label="Gatuadress"
                labelDescription="Gatunamn och nummer"
                inputType="text"
                fieldError={errors.streetAddress}
                register={register}
            />

            <FormField
                fieldName="postalCode"
                label="Postnummer"
                labelDescription="XX XXX eller XXXXXX tillåtet"
                inputType="text"
                fieldError={errors.postalCode}
                register={register}
            />

            <FormField
                fieldName="city"
                label="Postort"
                inputType="text"
                fieldError={errors.city}
                register={register}
            />

            <FormField
                fieldName="phoneNumber"
                label="Telefonnummer"
                inputType="tel"
                fieldError={errors.phoneNumber}
                register={register}
            />

            <ContinueButton />
        </form>
    );
}