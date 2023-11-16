import { useState } from "react";
import { loginCustomer } from "../../api/CustomerApi.ts";
import { BsPersonFillAdd } from "react-icons/bs";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { FormField } from "./FormField.tsx";

const schema = z.object({
    emailAddress: z
        .string()
        .nonempty({ message: "Email is required." })
        .email({ message: "Please provide a valid email address." }),
    password: z
        .string()
        .nonempty({ message: "Password is required." }),
});

type FormData = z.infer<typeof schema>;

export function FormLogin() {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
    const navigation = useNavigate();

    async function onSubmit(data: FieldValues) {
        try {
            const response = await loginCustomer(data.emailAddress, data.password);
            if (response?.status == 200)
                navigation(-1);
            else
                setErrorMessage("Email or password are incorrect!");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="popup">
                <form className="mt-5 popup-content rounded-2 bg-beige"
                    onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="fs-2 my-3 fw-bold text-dark-purple" style={{ fontFamily: 'Tiempos' }}>Logga in
                        <button
                            type="button"
                            className="btn-close btn-dark small float-end"
                            aria-label="Close window"
                            onClick={() => navigation(-1)}
                        />
                    </h1>
                    {errorMessage && <div className="text-danger my-1">{errorMessage}</div>}
                    <FormField
                        fieldName="emailAddress"
                        label="Epostadress"
                        inputType="email"
                        fieldError={errors.emailAddress}
                        customError={errorMessage}
                        register={register}
                    />
                    <FormField
                        fieldName="password"
                        label="Lösenord"
                        inputType="password"
                        fieldError={errors.password}
                        customError={errorMessage}
                        register={register}
                    />
                    <button type="submit" className="btn btn-dark-purple w-100">Logga in</button>
                    <div className="mt-3 d-flex gap-2 align-items-center">
                        <BsPersonFillAdd size={20} />
                        <strong>Ny kund? </strong><Link to="/register" className="text-dark-purple">Registrera ett konto.</Link>
                    </div>
                </form>
            </div>
        </>
    )
}