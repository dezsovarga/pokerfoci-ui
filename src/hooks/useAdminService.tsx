import {adminActions} from "../store/admin-slice";
import {useDispatch, useSelector} from "react-redux";
import {latestEventActions} from "../store/latest-event-slice";
import {API_URL} from "../Constants";
import {useEffect} from "react";

export default function useLoadAccounts(url: string) {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.login);

    async function fetchData() {
        const response = await fetch(`${API_URL}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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
        dispatch(adminActions.loadAccountsRequest());
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
}

export function useLoadLatestEvent(url: string) {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.login);

    async function fetchData() {
        const response = await fetch(`${API_URL}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).catch((err) => {
            dispatch(latestEventActions.loadLatestEventFailure({
                loadingError: err.message
            }));
        });
        const data = await response.json();
        if (response.status !== 200) {
            dispatch(latestEventActions.loadLatestEventFailure({
                loadingError: data.reason || data.error
            }));
        } else {
            dispatch(latestEventActions.loadLatestEventSuccess({data: data}));
        }
    }

    useEffect(() => {
        dispatch(latestEventActions.loadLatestEventRequest());
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);
}