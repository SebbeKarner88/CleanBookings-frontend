import NavBar from "../common/NavBar"

const LogIn = () => {

    /* TODO: add logic for logging in as customer/employee/admin */

    return (
        <>
            <NavBar />
            <h1>Log In</h1>
            {/* form for logging in  */}
            <p>Don't have an account? Sign up <a href="/register">here</a></p>
        </>
    )
}

export default LogIn