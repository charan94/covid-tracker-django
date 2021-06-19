import React from 'react';
import Modal from 'react-bootstrap/Modal';

const CModal = (props) => {

    const { size, show, title, modalBody, hideModal, footer, dialogClass } = props;

    return (
        <Modal
            size={size}
            aria-labelledby="modal-title"
            centered
            show={show}
            onHide={hideModal}
            dialogClassName={dialogClass}
        >
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modalBody}
            </Modal.Body>
            {footer ? (<Modal.Footer>
                {footer}
            </Modal.Footer>) : null}
        </Modal>
    )
}

export default CModal;