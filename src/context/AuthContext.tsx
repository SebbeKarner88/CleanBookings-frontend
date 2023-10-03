import React, { createContext, ReactNode, useState } from 'react';

interface IAuthContext {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    customerId: string;
    setCustomerId: React.Dispatch<React.SetStateAction<string>>;
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>;
}

const defaultAuthContext: IAuthContext = {
    isAuthenticated: false,
    setIsAuthenticated: () => {
    },
    customerId: "",
    setCustomerId: () => {
    },
    name: "",
    setName: () => {
    }
};

export const AuthContext = createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ customerId, setCustomerId ] = useState("");
    const [ name, setName ] = useState("");

    const authContextValue = {
        isAuthenticated,
        setIsAuthenticated,
        customerId,
        setCustomerId,
        name,
        setName
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
