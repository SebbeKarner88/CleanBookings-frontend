export default function ConfirmationView() {

    return (
        <div className="container">
            <h1 className="text-md-center fw-bold my-4">
                Tack för din bokning!
            </h1>
            <img
                className={"my-4"}
                src="/src/assets/images/check.png"
                alt="A checkbox indicating successful request"
                width={300}
            />
            <p className={"my-4 text-start"}>
                Du kommer snart att få en bekräftelse på din bokade städning skickad till din e-postadress.
            </p>
        </div>
    )
}