import {Footer} from "../common/Footer.tsx";
import NavBar from "../common/NavBar"
import {FormRegisterContactDetails} from "./forms/register/FormRegisterContactDetails.tsx";
import {FormRegisterAccountDetails} from "./forms/register/FormRegisterAccountDetails.tsx";
import {useState} from "react";

const Register = () => {
    const [step, setStep] = useState<number>(1);
    const isFinalStep = step === 2;

    return (
        <>
                <NavBar/>
                <div className="container" style={{maxWidth: "800px"}}>
                    <h1 className="my-3 px-4 fw-bold text-start text-md-center">Register an account</h1>
                    {
                        isFinalStep
                            ? <FormRegisterAccountDetails />
                            : <FormRegisterContactDetails onNext={() => setStep(step + 1)} />
                    }
                </div>
                <Footer/>
        </>
    )
}

export default Register