import {FieldValues, useForm} from "react-hook-form";
import {BsExclamationCircle} from "react-icons/bs"
import {FormField} from "../FormField.tsx";
import {useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFormContext} from "../../../context/RegisterFormContext.tsx";
import {registerCustomer} from "../../../api/CustomerApi.ts";
import {Button} from "react-bootstrap";
import PrivacyModal from "../../modals/PrivacyModal.tsx";
import RegistrationSuccessModal from "../../modals/RegistrationSuccessModal.tsx";

const schema = z.object({
    emailAddress: z
        .string()
        .nonempty({message: "Email is required."})
        .email({message: "Please provide a valid email address."}),
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters."})
        .regex(/\d/, {message: "Password must contain at least one digit [0-9]."})
        .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter [A-Z]"})
        .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter [a-z]"}),
    confirmPassword: z
        .string(),
    terms: z.boolean().refine(value => value, {
        message: "You must accept the terms and conditions to be able to register an account."
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export function FormRegisterAccountDetails() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const {formData} = useFormContext();
    const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");

    async function onSubmit(data: FieldValues) {
        try {
            const response = await registerCustomer(
                formData.firstName,
                formData.lastName,
                formData.ssn,
                formData.streetAddress,
                parseInt(formData.postalCode.replace(/\s/g, '')),
                formData.city,
                formData.phoneNumber,
                data.emailAddress,
                data.password,
            );
            if (response?.status == 201)
                setUsername(data.emailAddress);
                setShowSuccessModal(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form className="my-3 my-md-5 px-4 text-start" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="my-3 fw-bold text-dark-purple">
                    Kontouppgifter
                </h2>

                <FormField
                    fieldName="emailAddress"
                    label="Epostadress"
                    labelDescription="Kommer att användas som ditt användarnamn"
                    inputType="email"
                    fieldError={errors.emailAddress}
                    register={register}
                />
                <FormField
                    fieldName="password"
                    label="Lösenord"
                    labelDescription="Måste innehålla minst 8 tecken, minst 1 nummer, minst 1 stor bokstav & minst 1 liten bokstav"
                    inputType="password"
                    fieldError={errors.password}
                    register={register}
                />
                <FormField
                    fieldName="confirmPassword"
                    label="Bekräfta lösenord"
                    inputType="password"
                    fieldError={errors.confirmPassword}
                    register={register}
                />

                <div className="mb-3 form-check">
                    {errors.terms && (
                        <p className="text-danger mt-1 mb-2"><BsExclamationCircle/>
                            Du måste godkänna användarvillkoren och sekretesspolicyn för att skapa ett konto.
                        </p>
                    )}
                    <input {...register('terms')} type="checkbox" className="form-check-input" id="terms"/>
                    <label className={errors.terms ? "form-check-label is-invalid" : "form-check-label"}
                           htmlFor="terms">
                        Jag accepterar
                        <Button variant="link" className="text-dark-purple" onClick={() => setShowPrivacyModal(true)}>
                            användarvillkoren
                        </Button> och
                        <Button variant="link" className="text-dark-purple" onClick={() => setShowPrivacyModal(true)}>
                            sekretesspolicyn
                        </Button>
                    </label>
                </div>
                <Button type="submit" className="btn btn-dark-purple w-100">
                    Registrera
                </Button>
            </form>
            <PrivacyModal onShow={showPrivacyModal} onClose={() => setShowPrivacyModal(false)}/>
            <RegistrationSuccessModal onShow={showSuccessModal} username={username} />
        </>
    );
}