import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {adminActions} from "../../../store/admin-slice";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from "react-bootstrap/Form";
import ListGroup from 'react-bootstrap/ListGroup';
import classes from "./NewEventModal.module.css";
import {Circle, CheckCircle} from 'react-bootstrap-icons';
import {API_URL} from "../../../Constants";

const NewEventModal = (props) => {

    const dispatch = useDispatch();
    const showModal = useSelector(state => state.admin.events.showAddNewEventModal);
    const token = useSelector(state => state.login.token);
    const [selectedDate, setSelectedDate] = useState(null);

    // const isLoadingAccounts = useSelector(state => state.admin.accounts.isLoading);
    const accounts = useSelector(state => state.admin.accounts.accountData);
    // const accountsLoadingError = useSelector(state => state.admin.accounts.loadingError);

    const saveEventsError = useSelector(state => state.admin.saveEvent.savingError);
    const saveEventsLoading = useSelector(state => state.admin.saveEvent.isLoading);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleClose = () => {
        dispatch(adminActions.closeAddNewEventModal());
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedDate === null) {
            dispatch(adminActions.saveEventFailure({
                error: 'You need to provide a valid event date'
            }));
        }

        let selectedUsernames = accounts.filter(account => account.selected).map(a => a.username);
        const createEventDto = {
            eventDateEpoch: selectedDate.getTime(),
            registeredPlayers: selectedUsernames,
        }

        onSaveEventHandler(createEventDto);
    }

    async function onSaveEventHandler(createEventDto) {
        dispatch(adminActions.saveEventRequest());

        const response = await fetch(`${API_URL}/admin/event`, {
            method: 'POST',
            body: JSON.stringify(createEventDto),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch((err) => {
            dispatch(adminActions.saveEventFailure({
                error: err.message
            }));
        });
        if (response.ok) {
            // const data = await response.json();
            dispatch(adminActions.saveEventSuccess());
            dispatch(adminActions.closeAddNewEventModal());
            props.refreshAccounts();

        }
        if (!response.ok) {
            const data = await response.json();
            //TODO: add error feedback
            dispatch(adminActions.saveEventFailure({
                error: data.reason || data.error
            }));
        }
    }

    const updatePlayerSelection = (selectedIndex) => {
        dispatch(adminActions.updateAccountSelection({selectedIndex: selectedIndex}));
    };

    const allPayersList = () => {
        return (
            <div className={classes.playerList}>
                <ListGroup  as="ol" >
                    {accounts.map((player, index) =>
                        <ListGroup.Item key={player.id} onClick={() => updatePlayerSelection(index)}
                                        as="li"
                                        className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw">{player.username}</div>
                            </div>
                            {!player.selected && <Circle className={classes.playerCheck} data-testid='player-not-checked'/>}
                            {player.selected && <CheckCircle className={classes.playerCheck} data-testid='player-checked'/>}

                        </ListGroup.Item> )
                    }
                </ListGroup>
            </div>
        )
    }

    useEffect(() => {
        props.loadAccounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Modal show={showModal} onHide={handleClose} data-testid='add-new-event-modal'>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Create new event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Select event date and time</Form.Label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Select a date and time"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Select players</Form.Label>
                        {allPayersList()}
                    </Form.Group>
                    <div>
                        <p className={classes.error}>{saveEventsError}</p>
                        {saveEventsLoading && <div>Loading...</div>}
                    </div>
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