import {createContext, Dispatch,  ReactNode, SetStateAction, useState} from 'react';

interface IAuthContext {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    customerId: string;
    setCustomerId: Dispatch<SetStateAction<string>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
}

const defaultAuthContext: IAuthContext = {
    isAuthenticated: false,
    setIsAuthenticated: () => {
    },
    customerId: "",
    setCustomerId: () => {
    },
    username: "",
    setUsername: () => {
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
    const [ username, setUsername ] = useState("");

    const authContextValue = {
        isAuthenticated,
        setIsAuthenticated,
        customerId,
        setCustomerId,
        username,
        setUsername,
        name,
        setName
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
