import {FieldValues, useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {VscAccount} from "react-icons/vsc";
import {FormField} from "../FormField.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFormContext} from "../../../context/RegisterFormContext.tsx";

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
        .nonempty({message: "Social security number is required."})
});

type FormData = z.infer<typeof schema>;

interface IFormRegisterPersonalDetails {
    onNext: () => void;
}

export function FormRegisterPersonalDetails({onNext}: IFormRegisterPersonalDetails) {
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
                Personal details
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