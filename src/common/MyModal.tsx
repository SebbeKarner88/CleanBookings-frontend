import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Props {
    header: string,
    description: string,
    modalVisible: boolean,
    onRequestClose(): void,
    onConfirm?(): void
}

const MyModal = ({ header, description, modalVisible, onRequestClose, onConfirm  } : Props) => {

    return (
      <Modal show={modalVisible} onHide={onRequestClose}>
        <Modal.Dialog>
        {/* <Modal.Header closeButton> */}
          <Modal.Title>{header}</Modal.Title>
  {/*       </Modal.Header> */}

        <Modal.Body>
          <p>{description}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button 
          variant="outline-dark"
          onClick={onRequestClose}>Close</Button>
            {onConfirm && (
                <Button
                    variant="danger"
                    onClick={onConfirm}>Confirm</Button>
            )}

        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
    )
}

export default MyModal