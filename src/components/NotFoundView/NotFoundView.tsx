import NavBar from "../../common/NavBar.tsx"
import Container from 'react-bootstrap/Container'
import {Footer} from "../../common/Footer.tsx"
import Image from "react-bootstrap/Image";
import notFound from '../../assets/images/notFound.jpg'
import "./notFoundStyles.css"

function NotFoundView() {

    return (
        <>

            <NavBar/>
            <Container className="mt-5 mb-5 notFoundContainer">
                <Image src={notFound} height={500} width={500} fluid/>
            </Container>
            <Footer/>

        </>
    )
}

export default NotFoundView