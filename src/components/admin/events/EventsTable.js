import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import MaterialTable from "material-table";
import {PlusCircle} from "react-bootstrap-icons";
import { event_data } from './event_data';
import AdminRegisteredPlayers from "./AdminRegisteredPlayers";
import classes from "./EventsTable.module.css";
import {adminActions} from "../../../store/admin-slice";
import {useDispatch} from "react-redux";
import NewEventModal from "./NewEventModal";

const EventsTable = (props) => {

    const dispatch = useDispatch();

    const columns = [
        { title: 'Date', field: 'eventDate' },
        { title: 'Status', field: 'status'},
        { title: 'Score', field: 'score'}
    ];

    const handleShowNewEventModal = () => dispatch(adminActions.openAddNewEventModal());

    const defaultMaterialTheme = createTheme();

    const AdminEventsTable = () => {
        return (
            <section className={classes.tableWidth} data-testid='admin-events-table'>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        columns={columns}
                        data={event_data}
                        enablePagination={false}
                        title='Events'
                        detailPanel={rowData => {
                            return <AdminRegisteredPlayers registeredPlayers={rowData.registeredPlayers}></AdminRegisteredPlayers>
                        }}
                        onRowClick={(event, rowData, togglePanel) => togglePanel()}
                        options={{
                            padding: "dense",
                            search: true
                        }}
                        localization={{
                            pagination: {
                                labelRowsPerPage:"",
                                labelDisplayedRows:""
                            }
                        }}
                        actions={[
                            {
                                icon: () => <PlusCircle data-testid='add-new-event'/>,
                                tooltip: 'Create new event',
                                isFreeAction: true,
                                onClick: (event) => {handleShowNewEventModal()}
                            }
                        ]}
                    />
                </ThemeProvider>
            </section>
        );
    }

    return (
        <React.Fragment>
            <AdminEventsTable></AdminEventsTable>
            <NewEventModal loadAccounts={props.loadAccounts}></NewEventModal>
        </React.Fragment>
    )
}

export default EventsTable