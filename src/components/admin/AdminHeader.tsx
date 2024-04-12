import React from "react";
import {Link} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import classes from "./AdminHeader.module.css";

const AdminHeader = () => {

    return (
        <section >
            <container >
                <Row className={classes.admin_header_menu}>
                    <Col className={classes.admin_header_menu_buttons} xs={6} md={6} lg={6}>
                        <Link className="nav-link" to="/admin-page/events" data-testid='home-link'>
                            Events
                        </Link>
                    </Col>
                    <Col className={classes.admin_header_menu_buttons} xs={6} md={6} lg={6} >
                        <Link className="nav-link" to="/admin-page/players" data-testid='home-link'>
                            Players
                        </Link>
                    </Col>
                </Row>
            </container>
        </section>
    )
}

export default AdminHeader;