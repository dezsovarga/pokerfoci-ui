import React from "react";
import AdminHeader from "./AdminHeader";
import PlayersTable from "./players/PlayersTable";
import EventsTable from "./events/EventsTable";

const AdminPage = ({section}) => {

    return (
        <div >
            <h2>Admin page</h2>
            <AdminHeader />
            {section==='players' && <PlayersTable></PlayersTable>}
            {section==='events' && <EventsTable></EventsTable>}

        </div>
    )
}

export default AdminPage