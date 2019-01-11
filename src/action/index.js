import * as axios from 'axios';

export const CHART_DATA_START_FETCH = 'LOAD_CHART_DATA';
export const CHART_DATA_FETCH_SUCCESS = 'CHART_DATA_READY';

export function fetchChartData(url) {
    return (dispatch) => {
        const cancelTokenSource = axios.CancelToken.source();
        const fetchAsync = axios.get(url, {
            cancelToken: cancelTokenSource.token,
        });
        dispatch({
            type: CHART_DATA_START_FETCH,
            cancelTokenSource, 
        });
        fetchAsync.then(({ data }) => dispatch({
            type: CHART_DATA_FETCH_SUCCESS,
            data,
        }));
    };
}
