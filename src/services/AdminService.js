// import {adminActions} from "../store/admin-slice";
// import {useDispatch} from "react-redux";
//
//
// export async function loadAccounts() {
//     const dispatch = useDispatch();
//
//     dispatch(adminActions.loadAccountsRequest());
//
//     const response = await fetch('http://localhost:8081/admin/accounts', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     });
//     const data = await response.json();
//     if (response.status !== 200) {
//         dispatch(adminActions.loadAccountsFailure({
//             loadingError: data.reason || data.error
//         }));
//     } else {
//         dispatch(adminActions.loadAccountsSuccess({data: data}));
//     }
// }