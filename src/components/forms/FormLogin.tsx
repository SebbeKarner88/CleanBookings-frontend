import {useState} from "react";
import {loginCustomer} from "../../api/CustomerApi.ts";
import {BsPersonFillAdd} from "react-icons/bs";
import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "react-router-dom";
import {FormField} from "./FormField.tsx";

const schema = z.object({
    emailAddress: z
        .string()
        .nonempty({message: "Email is required."}),
    password: z
        .string()
        .nonempty({message: "Password is required."}),
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigation = useNavigate();

    function onSubmit(data: FieldValues) {
        loginCustomer(data.emailAddress, data.password).then(response => {
            if (response?.status == 200) {
                // Set username and/or role if needed later?
                console.log(response.data);
                navigation("/");
            } else {
                setErrorMessage("Email or password are incorrect!");
            }
        }).catch(error => console.error(error.message));
    }

    return (
        <>
            <div className="popup">
                <form className="mt-3 popup-content rounded-2"
                      onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="h4">Login <Link to="/">
                        <button type="button" className="btn-close btn-dark small float-end"
                                aria-label="Close window"></button>
                    </Link></h1>
                    {errorMessage && <div className="text-danger my-1">{errorMessage}</div>}
                    <FormField
                        fieldName="emailAddress"
                        label="Email"
                        inputType="email"
                        fieldError={errors.emailAddress}
                        customError={errorMessage}
                        register={register}
                    />
                    <FormField
                        fieldName="password"
                        label="Password"
                        inputType="password"
                        fieldError={errors.password}
                        customError={errorMessage}
                        register={register}
                    />
                    <button type="submit" className="btn btn-primary w-100">Sign in</button>
                    <div className="mt-3 d-flex gap-2 align-items-center">
                        <BsPersonFillAdd size={20}/>
                        <strong>First time? </strong><Link to="/register">Register an account</Link>
                    </div>
                </form>
            </div>
        </>
    )
}