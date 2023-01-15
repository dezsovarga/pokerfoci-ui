import React from "react";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "../../store/admin-slice";
import { useRef } from 'react';
import {signupActions} from "../../store/signup-slice";

const NewPlayerModal = (props) => {

    const dispatch = useDispatch();
    const showModal = useSelector(state => state.admin.accounts.showAddNewPlayerModal);
    const token = useSelector(state => state.login.token);

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
            //TODO validation feedback
        } else {
            onSaveAccountHandler(accountDto)
        }
    }

    async function onSaveAccountHandler(accountDto) {
        dispatch(adminActions.saveAccountRequest());

        const response = await fetch('http://localhost:8081/admin/account', {
            method: 'POST',
            body: JSON.stringify(accountDto),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            // const data = await response.json();
            dispatch(adminActions.saveAccountSuccess());
            dispatch(adminActions.closeAddNewPlayerModal());
            props.refreshAccounts();

        }
        if (!response.ok) {
            const data = await response.json();
            dispatch(signupActions.signupFailure({
                error: data.reason
            }));
        }
    }

    return (
        <React.Fragment>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Add new player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control required type="text" placeholder="Username" ref={userNameRef}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSkill">
                            <Form.Control required type="text" placeholder="Skill" ref={skillRef}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control required type="email" placeholder="Email" ref={emailRef}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control required type="password" placeholder="Password" ref={passwordRef}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Control required type="password" placeholder="Confirm Password" ref={confirmPasswordRef}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    );
}

export default NewPlayerModal;