import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {adminActions} from "../../../store/admin-slice";

const NewEventModal = (props) => {

    const dispatch = useDispatch();
    const showModal = useSelector(state => state.admin.events.showAddNewEventModal);
    const token = useSelector(state => state.login.token);

    const handleClose = () => {
        dispatch(adminActions.closeAddNewEventModal());
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        alert("submit")
    }

    return (
        <React.Fragment>
            <Modal show={showModal} onHide={handleClose} data-testid='add-new-event-modal'>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Create new event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Modal body
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} data-testid='add-new-event-modal-close'>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} type="submit" data-testid='new-event-submit-button'>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default NewEventModal;