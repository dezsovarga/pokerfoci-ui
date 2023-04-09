import MaterialTable from 'material-table';
// import { data } from './data';
import React, {useEffect, useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import classes from './PlayersTable.module.css';
import Switch from '@mui/material/Switch';
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "../../store/admin-slice";
import NewPlayerModal from "./NewPlayerModal";
import { PlusCircle } from 'react-bootstrap-icons';
import {API_URL} from "../../Constants";
import UpdateAccountFeedback from "./UpdateAccountFeedback";

const PlayersTable = () => {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.login);
    const {updateError} = useSelector(state => state.admin.updateAccount);
    const [showFeedbackMessage, setShowFeedbackMessage] = useState(null);

    setTimeout(() => {
        setShowFeedbackMessage(false);
    }, 3000);

    const columns = [
        { title: 'Name', field: 'username' },
        { title: 'Email', field: 'email' },
        { title: 'isAdmin', field: 'admin',
            render: rowData => <Switch defaultChecked={rowData.isAdmin}
                                       data-testid={`isAdminSwitch_${rowData.id}`}
                                       onClick={(e) => updateAccountHandler({id: rowData.id, isAdmin: !rowData.isAdmin}, e)} /> },
        { title: 'isEnabled', field: 'active',
            render: rowData => <Switch defaultChecked={rowData.isActive}
                                       data-testid={`isEnabledSwitch_${rowData.id}`}
                                       onClick={(e) => updateAccountHandler({id: rowData.id, isActive: !rowData.isActive}, e)} /> }
    ];
    const isLoading = useSelector(state => state.admin.accounts.isLoading);
    const accounts = useSelector(state => state.admin.accounts.accountData);
    const loadingError = useSelector(state => state.admin.accounts.loadingError);

    const handleShowNewPlayerModal = () => dispatch(adminActions.openAddNewPlayerModal());

    async function updateAccountHandler(rowData) {
        dispatch(adminActions.updateAccountRequest());

        const updateAccountDto = {
            id: rowData.id,
            isAdmin: rowData.isAdmin,
            isActive: rowData.isActive
        }

        const response = await fetch(`${API_URL}/admin/account`, {
            method: 'PUT',
            body: JSON.stringify(updateAccountDto),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch((err) => {
            dispatch(adminActions.updateAccountFailure({
                error: err.message
            }));
            setShowFeedbackMessage(true);
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(adminActions.updateAccountSuccess({data: data}));
            setShowFeedbackMessage(true);
        }
        if (!response.ok) {
            const data = await response.json();
            //TODO: add error feedback
            dispatch(adminActions.updateAccountFailure({
                error: data.reason || data.error
            }));
            setShowFeedbackMessage(true);
        }
    }

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

    useEffect(() => {
        loadAccounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const defaultMaterialTheme = createTheme();

    const AdminAccountsTable = () => {
        return (
            <section className={classes.tableWidth} data-testid='admin-players-table'>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        columns={columns}
                        data={accounts.map(o => ({ ...o }))}
                        enablePagination={false}
                        title='Players'
                        // onRowClick={(evt, selected_Row) =>
                        //     setSelected_Row(selected_Row.tableData.id)
                        // }
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
                                onClick: (event) => {handleShowNewPlayerModal()}
                            }
                        ]}
                    />
                </ThemeProvider>
            </section>
        );
    }

    return (
        <React.Fragment>
            <p className={classes.loadingError}>{loadingError}</p>
            {isLoading && <p>Loading...</p>}
            {!isLoading && !loadingError && <AdminAccountsTable></AdminAccountsTable>}
            <NewPlayerModal refreshAccounts={loadAccounts}/>
            {showFeedbackMessage && <UpdateAccountFeedback success={!updateError}/>}
        </React.Fragment>
    );
}

export default PlayersTable;