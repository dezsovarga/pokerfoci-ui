import {renderWithProviders} from "../../utils/test-utils";
import {screen} from "@testing-library/react";
import Header from "./Header";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from "react";

const initialState = {
    login: {
        token: 'sssssaaaaaa',
        username: 'loggedInUser',
        roles: [],
        isLoggedIn: true,
        isLoading: false,
        authError: ''
    }
}

describe('Header component', () => {

    test('renders Header component with admin role', () => {
        // Arrange
        initialState.login.roles = ['ROLE_ADMIN'];
        let {store} = renderWithProviders(
            <Router><Header/></Router>, { preloadedState: initialState});
        // Act
        // ... nothing

        // Assert
        const adminPageLink = screen.getByTestId('admin-page-link');
        expect(adminPageLink).toBeInTheDocument();
    });

    test('renders Header component with user role', () => {
        // Arrange
        initialState.login.roles = ['ROLE_USER'];
        let {store} = renderWithProviders(
            <Router><Header/></Router>, { preloadedState: initialState});
        // Act
        // ... nothing

        // Assert
        const adminPageLink = screen.queryByTestId('admin-page-link');
        expect(adminPageLink).not.toBeInTheDocument();
    });

});