import api from "./ApiRootUrl.ts";

export async function loginCustomer(
    email: string,
    password: string
)  {
    try {
        return await api.post(
            "customer/login",
            {
                email: email,
                password: password
            }
        );
    } catch (error) {
        console.error(error);
    }
}

export async function registerCustomer(
    firstName: string,
    lastName: string,
    customerType: "PRIVATE" | "BUSINESS",
    streetAddress: string,
    postalCode: number,
    city: string,
    phoneNumber: string,
    emailAddress: string,
    password: string
)  {
    try {
        return await api.post(
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
            },
        );
    } catch (error) {
        console.error(error);
    }
}