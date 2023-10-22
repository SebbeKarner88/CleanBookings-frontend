import {useState} from "react";
import {ProgressBar} from "react-bootstrap";
import {Footer} from "../common/Footer.tsx";
import NavBar from "../common/NavBar.tsx"
import {FormRegisterContactDetails} from "./forms/register/FormRegisterContactDetails.tsx";
import {FormRegisterAccountDetails} from "./forms/register/FormRegisterAccountDetails.tsx";
import {FormRegisterPersonalDetails} from "./forms/register/FormRegisterPersonalDetails.tsx";

export default function RegisterView() {
    const steps = [1, 2, 3];
    const [step, setStep] = useState<number>(steps[0]);
    const isFinalStep = step === steps.length;
    const onNext: () => void = () => setStep(step + 1);
    const now: number = step / steps.length * 100;

    return (
        <div className="bg-light-brown">
            <NavBar/>
            <div className="container" style={{maxWidth: "800px"}}>
                <h1 className="my-3 px-4 fw-bold text-start text-md-center">Register an account</h1>
                <ProgressBar
                    className="my-4 mx-4"
                    aria-hidden={true}
                    animated={true}
                    variant="dark"
                    now={now}
                    label={now.toFixed() + "%"}
                />
                {step === 1 && <FormRegisterPersonalDetails onNext={onNext}/>}
                {step === 2 && <FormRegisterContactDetails onNext={onNext}/>}
                {isFinalStep && <FormRegisterAccountDetails/>}
            </div>
            <Footer/>
        </div>
    )
}