import {z} from "zod";
import {useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updatePassword} from "../../api/CustomerApi.ts";
import {FormField} from "./FormField.tsx";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import UpdatePasswordSuccessModal from "../modals/UpdatePasswordSuccessModal.tsx";

const schema = z.object({
    currentPassword: z
        .string(),
    newPassword: z
        .string()
        .min(8, {message: "Password must be at least 8 characters."})
        .regex(/\d/, {message: "Password must contain at least one digit [0-9]."})
        .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter [A-Z]"})
        .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter [a-z]"}),
    confirmPassword: z
        .string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function FormUpdatePassword() {
    const customerId = sessionStorage.getItem("customerId");
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const navigation = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const closeModal = () => setShowModal(false);

    async function onSubmit(data: FieldValues) {
        try {
            const response = await updatePassword(
                customerId,
                data.currentPassword,
                data.newPassword
            );
            if (response?.status == 204) {
                setErrorMessage(null);
                setShowModal(true);
            } else {
                setErrorMessage("Incorrect password.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errorMessage && <div className="my-1 fw-bold text-danger">{errorMessage}</div>}
                <FormField
                    fieldName="currentPassword"
                    label="Nuvarande lösenord"
                    inputType="password"
                    fieldError={errors.currentPassword}
                    customError={errorMessage}
                    register={register}
                />

                <FormField
                    fieldName="newPassword"
                    label="Nytt lösenord"
                    labelDescription="Måste innehålla minst 8 tecken, minst 1 nummer, minst 1 stor bokstav & minst 1 liten bokstav"
                    inputType="password"
                    fieldError={errors.newPassword}
                    register={register}
                />

                <FormField
                    fieldName="confirmPassword"
                    label="Bekräfta lösenord"
                    inputType="password"
                    fieldError={errors.confirmPassword}
                    register={register}
                />

                <Button type="submit" className="btn-dark-purple w-100 mb-3">
                    Uppdatera lösenord
                </Button>

                <Button
                    type="button"
                    variant="danger"
                    className="w-100"
                    onClick={() => navigation("/my-pages/settings")}
                >
                    Tillbaka till mina inställningar
                </Button>

            </form>
            <UpdatePasswordSuccessModal onShow={showModal} onClose={closeModal}/>
        </>
    )
}