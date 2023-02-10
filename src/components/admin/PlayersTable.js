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

const PlayersTable = () => {

    const dispatch = useDispatch();
    const [setSelectedRow] = useState(null);
    const {token} = useSelector(state => state.login);

    const columns = [
        { title: 'Name', field: 'username' },
        { title: 'Email', field: 'email' },
        { title: 'isAdmin', field: 'admin', render: rowData => <Switch defaultChecked={rowData.admin} /> },
        { title: 'isEnabled', field: 'active', render: rowData => <Switch defaultChecked={rowData.active} /> }
    ];
    const isLoading = useSelector(state => state.admin.accounts.isLoading);
    const accounts = useSelector(state => state.admin.accounts.accountData);
    const loadingError = useSelector(state => state.admin.accounts.loadingError);

    const handleShowNewPlayerModal = () => dispatch(adminActions.openAddNewPlayerModal());

    async function loadAccounts() {
        dispatch(adminActions.loadAccountsRequest());

        const response = await fetch('http://localhost:8081/admin/accounts', {
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
                        onRowClick={(evt, selectedRow) =>
                            setSelectedRow(selectedRow.tableData.id)
                        }
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

        </React.Fragment>
    );
}

export default PlayersTable;