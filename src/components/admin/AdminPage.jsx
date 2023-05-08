import React from "react";
import AdminHeader from "./AdminHeader";
import PlayersTable from "./players/PlayersTable";
import EventsTable from "./events/EventsTable";
import {adminActions} from "../../store/admin-slice";
import {API_URL} from "../../Constants";
import {useDispatch, useSelector} from "react-redux";

const AdminPage = ({section}) => {

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

    return (
        <div >
            <h2>Admin page</h2>
            <AdminHeader />
            {section==='players' && <PlayersTable loadAccounts={loadAccounts}></PlayersTable>}
            {section==='events' && <EventsTable loadAccounts={loadAccounts}></EventsTable>}

        </div>
    )
}

export default AdminPage