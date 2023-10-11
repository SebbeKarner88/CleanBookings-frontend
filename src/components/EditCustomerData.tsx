import React, { useState } from "react";
import { updateCustomerData } from "../api/CustomerApi";
import CustomerDataResponse from '../dto/CustomerDataResponse';



const EditCustomerData = ({ customerId }) => {

    const [formData, setFormData] = useState<CustomerDataResponse>({
        id: customerId,
        firstName: " ",
        lastName: "",
        customerType: "",
        streetAddress: "",
        postalCode:null ,
        city: "",
        phoneNumber: " ",
        emailAddress: "",

    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateCustomerData(customerId, formData);

        } catch (error) {
            console.error(error);

        }
    };


    return (
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}

            />

            <label htmlFor="customerType">Customer Type:</label>
            <select
                id="customerType"
                name="customerType"
                value={formData.customerType}
                onChange={handleInputChange}
                >
                <option value="PRIVATE">Private</option>
                <option value="BUSINESS">Business</option>
            </select>

            <label htmlFor="streetAddress">Street Address:</label>
            <input
                type="text"
                id= "streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                />
            <label htmlFor="postalCode">Postal Code:</label>
            <input
                type="text"
                id= "postalCode"
                name="postalCode"
                value={formData.postalCode ?? ""}
                onChange={handleInputChange}
                />
            <label htmlFor="city">City:</label>
            <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
            />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber ?? ""}
                onChange={handleInputChange}
            />
            <label htmlFor="emailAddress">Email Address:</label>
            <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
            />


                <button type="submit">Update Customer Data</button>
        </form>
    );
};

export default EditCustomerData;
