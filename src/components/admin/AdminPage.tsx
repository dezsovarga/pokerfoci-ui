import React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import EventsTable from "./events/EventsTable";
import {adminActions} from "../../store/admin-slice";
import {API_URL} from "../../Constants";
import {useDispatch, useSelector} from "react-redux";
import PlayersTable from "./players/PlayersTable";
import EventDetails from "./events/EventDetails";

const AdminPage = () => {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.login);

    const [value, setValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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

        const response = await fetch(`${API_URL}/event/events`, {
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
        <div>
            <h2>Admin page</h2>

            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Current event" value="1"/>
                            <Tab label="All events" value="2"/>
                            <Tab label="Players" value="3"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <EventDetails />
                    </TabPanel>
                    <TabPanel value="2">
                        <EventsTable loadAccounts={loadAccounts} loadEvents={loadEvents}></EventsTable>
                    </TabPanel>
                    <TabPanel value="3">
                        <PlayersTable loadAccounts={loadAccounts}></PlayersTable>
                    </TabPanel>
                </TabContext>
            </Box>

        </div>
    )
}

export default AdminPage