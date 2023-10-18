import CustomerDataField from "./CustomerDataField.tsx";

type Customer = {
    id: string;
    firstName: string;
    lastName: string;
    customerType: string;
    streetAddress: string;
    postalCode: number
    city: string;
    phoneNumber: string
    emailAddress: string;
}

interface ICustomerData {
    customer: Customer
}

export default function CustomerData({customer}: ICustomerData) {
    return (
        <>
            <div className="col-md-4">
                <CustomerDataField label="Customer ID" value={customer.id} />
                <CustomerDataField label="First name" value={customer.firstName} />
                <CustomerDataField label="Last name" value={customer.lastName} />
            </div>
            <div className="col-md-4">
                <CustomerDataField label="Type of customer" value={customer.customerType} />
                <CustomerDataField label="Street address" value={customer.streetAddress} />
                <CustomerDataField label="Postal code" value={customer.postalCode} />
            </div>
            <div className="col-md-4">
                <CustomerDataField label="City" value={customer.city} />
                <CustomerDataField label="Phone number" value={customer.phoneNumber} />
                <CustomerDataField label="Email address" value={customer.emailAddress} />
            </div>
        </>
    )
}