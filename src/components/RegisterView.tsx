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
        <>
            <NavBar/>
            <div className="bg-image min-vw-100 d-flex align-items-center py-4">
                <div className="container bg-light-brown p-4 my-4 rounded rounded-4 shadow" style={{maxWidth: "800px"}}>
                    <h1 className="fw-bold text-start text-md-center mx-4">Registrera ett konto</h1>
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
            </div>
            <Footer/>
        </>
    )
}