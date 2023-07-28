import React from "react";
import {Link} from "react-router-dom";

const AdminHeader = () => {

    return (
        <section>
            <nav className="navbar navbar-expand-md justify-content-center">
                <Link className="nav-link" to="/admin-page/events" data-testid='home-link'>
                    <button className="btn btn-light">Events </button>
                </Link>
                <Link className="nav-link" to="/admin-page/players" data-testid='home-link'>
                    <button className="btn btn-light">Players </button>
                </Link>
            </nav>
        </section>
    )

}

export default AdminHeader;