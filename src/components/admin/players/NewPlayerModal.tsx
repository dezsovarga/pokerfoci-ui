import React from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "../../../store/admin-slice";
import { useRef } from 'react';
import classes from "./NewPlayerModal.module.css";
import {API_URL} from "../../../Constants";

const NewPlayerModal = (props) => {

    const dispatch = useDispatch();
    const showModal = useSelector(state => state.admin.accounts.showAddNewPlayerModal);
    const token = useSelector(state => state.login.token);

    const saveAccountError = useSelector(state => state.admin.saveAccount.savingError);
    const saveAccountLoader = useSelector(state => state.admin.saveAccount.isLoading);

    const userNameRef = useRef('');
    const skillRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');

    const handleClose = () => {
        dispatch(adminActions.closeAddNewPlayerModal());
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const accountDto = {
            username: userNameRef.current.value,
            skill: skillRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPasswordRef.current.value
        }

        if (accountDto.password !== accountDto.confirmPassword) {
            dispatch(adminActions.saveAccountFailure({
                error: 'Password and confirmPassword should match'
            }));
        } else {
            onSaveAccountHandler(accountDto)
        }
    }

    async function onSaveAccountHandler(accountDto) {
        dispatch(adminActions.saveAccountRequest());

        const response = await fetch(`${API_URL}/admin/account`, {
            method: 'POST',
            body: JSON.stringify(accountDto),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch((err) => {
            dispatch(adminActions.saveAccountFailure({
                error: err.message
            }));
        });
        if (response.ok) {
            // const data = await response.json();
            dispatch(adminActions.saveAccountSuccess());
            dispatch(adminActions.closeAddNewPlayerModal());
            props.refreshAccounts();

        }
        if (!response.ok) {
            const data = await response.json();
            //TODO: add error feedback
            dispatch(adminActions.saveAccountFailure({
                error: data.reason
            }));
        }
    }

    return (
        <React.Fragment>
            <Modal show={showModal} onHide={handleClose} data-testid='add-new-player-modal'>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Add new player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" placeholder="Username" ref={userNameRef}
                                          data-testid= "username-input"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSkill">
                            <Form.Label>Skill</Form.Label>
                            <Form.Control required type="text" placeholder="Skill" ref={skillRef}
                                          data-testid= "skill-input"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="Email" ref={emailRef}
                                          data-testid= "email-input"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" ref={passwordRef}
                                          data-testid= "password-input"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control required type="password" placeholder="Confirm Password" ref={confirmPasswordRef}
                                          data-testid= "confirm-password-input"/>
                        </Form.Group>
                        <p className={classes.error}>{saveAccountError}</p>
                        {saveAccountLoader && <div>Loading...</div>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} data-testid='add-new-player-modal-close'>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} type="submit" data-testid='new-player-submit-button'>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    );
}

export default NewPlayerModal;