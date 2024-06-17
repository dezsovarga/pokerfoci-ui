import React, {useEffect} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import MaterialTable from "material-table";
import {PlusCircle} from "react-bootstrap-icons";
import AdminRegisteredPlayers from "./AdminRegisteredPlayers";
import classes from "./EventsTable.module.css";
import {adminActions} from "../../../store/admin-slice";
import {useDispatch, useSelector} from "react-redux";
import NewEventModal from "./NewEventModal";
import EventDetails from "./EventDetails";

const EventsTable: React.FC<{ loadEvents: () => void; loadAccounts: () => void}> = (props) => {

    const dispatch = useDispatch();

    // const isLoadingEvents = useSelector(state => state.admin.events.isLoading);
    const events = useSelector(state => state.admin.events.eventsData);
    // const loadingEventsError = useSelector(state => state.admin.events.loadingError);

    const columns = [
        { title: 'Date', field: 'eventDateTime' },
        { title: 'Status', field: 'status'},
        { title: 'Score', field: 'score'}
    ];

    const handleShowNewEventModal = () => dispatch(adminActions.openAddNewEventModal());

    const defaultMaterialTheme = createTheme();

    useEffect(() => {
        props.loadEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const AdminEventsTable = () => {
        return (
            <section className={classes.tableWidth} data-testid='admin-events-table'>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        columns={columns}
                        data={events.map(o => ({ ...o }))}
                        enablePagination={false}
                        title='Events'
                        detailPanel={rowData => {
                            return <EventDetails registeredPlayers={rowData.registeredPlayers} teamVariations={rowData.teamVariations}></EventDetails>
                            // return <AdminRegisteredPlayers registeredPlayers={rowData.registeredPlayers}></AdminRegisteredPlayers>
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
            <AdminEventsTable loadEvents={props.loadEvents}></AdminEventsTable>
            <NewEventModal loadAccounts={props.loadAccounts} loadEvents={props.loadEvents}></NewEventModal>
        </React.Fragment>
    )
}

export default EventsTable