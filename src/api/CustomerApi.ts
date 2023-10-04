import api from "./ApiRootUrl.ts";

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

import React from "react";

export async function registerCustomer(
    firstName: string,
    lastName: string,
    customerType: "PRIVATE" | "BUSINESS",
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
                customerType: customerType,
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
        return await api.post(
            "job",
            {
                customerId: customerId,
                type: type,
                date: date,
                message: message
            },
        );
    } catch (error) {
        console.error(error);
    }
}