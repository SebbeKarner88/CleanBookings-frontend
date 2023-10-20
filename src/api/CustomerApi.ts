import api from "./ApiRootUrl.ts";
import React from "react";

export async function loginCustomer(
    email: string,
    password: string,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setCustomerId: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
)
{
    try {
        const response = await api.post(
            "customer/login",
            {
                email: email,
                password: password
            }
        );
        if (response.status == 200) {
            setIsAuthenticated(true);
            setCustomerId(response.data.customerId);
            setName(response.data.name);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}




export async function registerCustomer(
    firstName: string,
    lastName: string,
    personNumber: string,
    streetAddress: string,
    postalCode: number,
    city: string,
    phoneNumber: string,
    emailAddress: string,
    password: string,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    setCustomerId: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
) {
    try {
        const response = await api.post(
            "customer",
            {
                firstName: firstName,
                lastName: lastName,
                personNumber: personNumber,
                customerType: "PRIVATE",
                streetAddress: streetAddress,
                postalCode: postalCode,
                city: city,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress,
                password: password
            }
        );
        if (response.status == 201) {
            setIsAuthenticated(true);
            setCustomerId(response.data.customerId);
            setName(response.data.name);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function bookService(
    customerId: string,
    type: string,
    date: string,
    message: string
) {
    try {
        const response = await api.post(
            "job",
            {
                customerId: customerId,
                type: type,
                date: date,
                message: message
            },
        )
        if (response.status == 201) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateCustomerData(
    customerId: string,
    firstName?: string,
    lastName?: string,
    streetAddress?: string,
    postalCode?: number,
    city?: string,
    phoneNumber?: string,
    emailAddress?: string
) {
    try {
        const response = await api.put(
            `customer/updateCustomer/${customerId}`,
            {
                firstName: firstName,
                lastName: lastName,
                streetAddress: streetAddress,
                postalCode: postalCode,
                city: city,
                phoneNumber: phoneNumber,
                emailAddress: emailAddress
            }
        );
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getJobsByCustomerId(customerId: string) {
    try {
        const response = await api.get(
            "/job/jobs",
            {
                params: {
                    customerId: customerId,
                }
            });
        if (response.status == 200) {
            return response;
            // return response.data;
        }
    } catch (error) {
        console.error(error);
        // return null;
    }
}

export async function getAllCleaners() {
    try {
        const response = await api.get(
            "/employee/getAllCleaners"
        );
        if (response.status == 200) {
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export async function executedCleaningRequest(
    customerId: string,
    jobId: string
) {
    try {
        const response = await api.put(
            "/job/executed-cleaning",
            {
                userId: customerId,
                jobId: jobId

            });
        if (response.status == 200)
            return response;
    } catch (error) {
        console.error(error);
    }
}

