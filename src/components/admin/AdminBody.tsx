import PlayersTable from "./players/PlayersTable";
import EventsTable from "./events/EventsTable";
import React from "react";
import {adminActions} from "../../store/admin-slice";
import {API_URL} from "../../Constants";
import {useDispatch, useSelector} from "react-redux";

type AdminBodyProps = {
    section: string
}

const AdminBody: React.FC<AdminBodyProps> = (props) => {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.login);

    async function loadAccounts() {
        dispatch(adminActions.loadAccountsRequest());

        const response = await fetch(`${API_URL}/admin/accounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch((err) => {
            dispatch(adminActions.loadAccountsFailure({
                loadingError: err.message
            }));
        });
        const data = await response.json();
        if (response.status !== 200) {
            dispatch(adminActions.loadAccountsFailure({
                loadingError: data.reason || data.error
            }));
        } else {
            dispatch(adminActions.loadAccountsSuccess({data: data}));
        }
    }

    async function loadEvents() {
        dispatch(adminActions.loadEventsRequest());

        const response = await fetch(`${API_URL}/admin/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch((err) => {
            dispatch(adminActions.loadEventsFailure({
                loadingError: err.message
            }));
        });
        const data = await response.json();
        if (response.status !== 200) {
            dispatch(adminActions.loadEventsFailure({
                loadingError: data.reason || data.error
            }));
        } else {
            dispatch(adminActions.loadEventsSuccess({data: data}));
        }
    }

    return (
        <div >
            {props.section ==='events' && <EventsTable loadAccounts={loadAccounts} loadEvents={loadEvents}></EventsTable>}
            {props.section==='players' && <PlayersTable loadAccounts={loadAccounts}></PlayersTable>}
        </div>
    )
}

export default AdminBody