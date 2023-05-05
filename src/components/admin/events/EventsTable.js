import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import MaterialTable from "material-table";
import {PlusCircle} from "react-bootstrap-icons";
import { event_data } from './event_data';
import AdminRegisteredPlayers from "./AdminRegisteredPlayers";
import classes from "./EventsTable.module.css";

const EventsTable = () => {

    const columns = [
        { title: 'Date', field: 'eventDate' },
        { title: 'Status', field: 'status'},
        { title: 'Score', field: 'score'}
    ];

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
                                icon: () => <PlusCircle data-testid='add-new-account'/>,
                                tooltip: 'Add User',
                                isFreeAction: true,
                                onClick: (event) => {alert("TBD")}
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
        </React.Fragment>
    )
}

export default EventsTable