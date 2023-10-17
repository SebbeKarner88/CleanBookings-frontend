import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react';


interface IFormData {
    firstName: string,
    lastName: string,
    ssn: string,
    streetAddress: string,
    postalCode: string,
    city: string,
    phoneNumber: string
}

interface IFormContext {
    formData: IFormData,
    setFormData: Dispatch<SetStateAction<IFormData>>
}

const defaultFormData: IFormData = {
    firstName: "",
    lastName: "",
    ssn: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    phoneNumber: ""
};

const RegisterFormContext = createContext<IFormContext | undefined>(undefined);

export const FormProvider = ({children}: { children: ReactNode }) => {
    const [formData, setFormData] = useState<IFormData>(defaultFormData);

    const formContextValue: IFormContext = {
        formData,
        setFormData
    };

    return (
        <RegisterFormContext.Provider value={formContextValue}>
            {children}
        </RegisterFormContext.Provider>
    );
};

export const useFormContext = () => {
    const context = useContext(RegisterFormContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};
