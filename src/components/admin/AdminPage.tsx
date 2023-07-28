import React from "react";
import AdminHeader from "./AdminHeader";
import AdminBody from "./AdminBody";

const AdminPage = ({section}) => {

    return (
        <div >
            <h2>Admin page</h2>
            <AdminHeader />
            <AdminBody section={section} />
        </div>
    )
}

export default AdminPage