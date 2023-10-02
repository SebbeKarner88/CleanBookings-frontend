interface CustomerDataResponse {
    id: string;
    firstName: string;
    lastName: string;
    customerType: string; // You might need to adjust the type if it's an enum
    streetAddress: string;
    postalCode: number | null; // Adjust the type to match your data
    city: string;
    phoneNumber: string | null; // Adjust the type to match your data
    emailAddress: string;
}

export default CustomerDataResponse;