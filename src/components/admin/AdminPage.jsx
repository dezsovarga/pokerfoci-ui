import React, {useState} from "react";
import AdminHeader from "./AdminHeader";
import PlayersTable from "./PlayersTable";

const AdminPage = () => {

    return (
        <div >
            <h2>Admin page</h2>
            <AdminHeader />
            <PlayersTable></PlayersTable>

        </div>
    )
}

export default AdminPage