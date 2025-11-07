import {useDispatch, useSelector} from "react-redux";
import {API_URL} from "../Constants";
import {adminActions} from "../store/admin-slice";
import {useEffect} from "react";

export default function useSaveEventStep(url: string) {

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
