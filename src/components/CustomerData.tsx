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
                <CustomerDataField label="Kund ID" value={customer.id} />
                <CustomerDataField label="Förnamn" value={customer.firstName} />
                <CustomerDataField label="Efternamn" value={customer.lastName} />
            </div>
            <div className="col-md-4">
                <CustomerDataField label="Typ av kund" value={customer.customerType} />
                <CustomerDataField label="Gatuadress" value={customer.streetAddress} />
                <CustomerDataField label="Postkod" value={customer.postalCode} />
            </div>
            <div className="col-md-4">
                <CustomerDataField label="Postort" value={customer.city} />
                <CustomerDataField label="Telefonnummer" value={customer.phoneNumber} />
                <CustomerDataField label="Epostadress" value={customer.emailAddress} />
            </div>
        </>
    )
}