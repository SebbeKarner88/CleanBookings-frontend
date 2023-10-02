import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import MyModal from '../../common/MyModal';
import { useState } from 'react'

const BookingForm = () => {
    const [ modalVisible, setModalVisible ] = useState(false)

    /* TODO: add logic with fetch for booking a service */

    return (
        <>
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="duedate">
                        <Form.Label>When should we clean?</Form.Label>
                        <Form.Control type="date" name="duedate" placeholder="Due date" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Button variant="outline-dark" type="submit" onClick={() => {
                        setModalVisible(!modalVisible)
                    }}>
                        Submit
                    </Button>
                </Form>
                <MyModal
                    modalVisible={modalVisible}
                    header='Thank you for booking!'
                    description='You will recieve a confirmation email shortly.'
                    onRequestClose={() => setModalVisible(!modalVisible)} />
            </Container>
        </>
    )
}

export default BookingForm