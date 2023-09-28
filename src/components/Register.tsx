import NavBar from "../common/NavBar"

const Register = () => {

    /* TODO: add logic for register in as customer/employee/admin */

    return (
        <>
            <NavBar />
            <h1>Register</h1>
            {/* form for register */}
            <p>Already have an account? Sign in <a href="/login">here</a></p>
        </>
    )
}

export default Register