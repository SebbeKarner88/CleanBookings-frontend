interface ICustomerDataField {
    label: string;
    value: string | number;
}

export default function CustomerDataField({label, value}: ICustomerDataField) {
    return (
        <>
            <h2 className="h4 fw-semibold" style={{color: "#825636"}}>
                {label}
            </h2>
            <p className="fs-5">
                {value}
            </p>
        </>
    )
}