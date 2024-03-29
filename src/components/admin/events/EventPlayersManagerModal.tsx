import React, {useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PlayerSelector, {AccountData} from "./PlayerSelector";
import classes from "./NewEventModal.module.css";
import Button from "react-bootstrap/Button";
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "../../../store/admin-slice";
import {PlayerData} from "../../home/EventRegistrationWidget";
import {API_URL} from "../../../Constants";

type EventPlayersManagerModalProp = {
    preselectedPlayers: PlayerData[],
    updateRegisteredPlayersList: (updatedRegisteredPlayers) => void
}

const EventPlayersManagerModal: React.FC<EventPlayersManagerModalProp> = (props) => {

    const dispatch = useDispatch();
    const showModal = useSelector(state => state.admin.events.showEventPlayersManagerModal);
    const accounts : AccountData[] = useSelector(state => state.admin.accounts.accountData);
    const saveEventsError = useSelector(state => state.admin.saveEvent.savingError);
    const saveEventsLoading = useSelector(state => state.admin.saveEvent.isLoading);
    const token = useSelector(state => state.login.token);

    useEffect(() => {
        preselectRegisteredUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const preselectRegisteredUsers = () => {

        accounts.forEach((obj, index) => {
            let toSelect = props.preselectedPlayers.some(player => player.userEmail === obj.email)
            if (toSelect) {
                dispatch(adminActions.updateAccountSelection({selectedIndex: index}));
            }
        })
    }

    const handleClose = () => {
        dispatch(adminActions.closeEventPlayersManagerModal());
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let selectedUsernames = accounts.filter(account => account.selected).map(a => a.username);
        const createEventDto = {
            registeredPlayers: selectedUsernames
        }

        onSavePlayersHandler(createEventDto);
    }

    async function onSavePlayersHandler(createEventDto) {
        dispatch(adminActions.updateEventRequest());

        const response = await fetch(`${API_URL}/event/event`, {
            method: 'PUT',
            body: JSON.stringify(createEventDto),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch((err) => {
            dispatch(adminActions.updateEventFailure({
                error: err.message
            }));
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(adminActions.updateEventSuccess());
            dispatch(adminActions.closeEventPlayersManagerModal());
            props.updateRegisteredPlayersList(data.registeredPlayers);
        }
        if (!response.ok) {
            const data = await response.json();
            //TODO: add error feedback
            dispatch(adminActions.updateEventFailure({
                error: data.reason || data.error
            }));
        }
    }

    return (
        <React.Fragment>
            <Modal show={showModal} onHide={handleClose} data-testid='update-event-modal'>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Manage players</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formPlayerSelector">
                        <PlayerSelector accounts={accounts}/>
                    </Form.Group>
                    <div>
                        <p className={classes.error}>{saveEventsError}</p>
                        {saveEventsLoading && <div>Loading...</div>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} data-testid='update-event-modal-close'>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} type="submit" data-testid='update-event-submit-button'>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default EventPlayersManagerModal;