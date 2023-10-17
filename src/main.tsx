import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "./context/AuthContext.tsx";
import {FormProvider} from "./context/RegisterFormContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <FormProvider>
                <App/>
            </FormProvider>
        </AuthProvider>
    </React.StrictMode>,
)