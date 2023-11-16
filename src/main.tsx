import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {FormProvider} from "./context/RegisterFormContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <FormProvider>
            <App/>
        </FormProvider>
    </React.StrictMode>,
)