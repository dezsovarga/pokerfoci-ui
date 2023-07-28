import React from "react";

const UpdateAccountFeedback = (props) => {

    return (
        <React.Fragment>
            {props.success && <div className="alert alert-success" role="alert" data-testid='switch-admin-role-success'>
                Account has been updated successfully!
            </div> }
            {!props.success && <div className="alert alert-danger" role="alert" data-testid='switch-admin-role-failure'>
                Account update has been failed ...
            </div> }

        </React.Fragment>
    );
}

export default UpdateAccountFeedback;