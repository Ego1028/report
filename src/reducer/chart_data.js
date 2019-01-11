import {
  CHART_DATA_START_FETCH,
  CHART_DATA_FETCH_SUCCESS,
} from '../action';

export const DATA_INIT = 'DATA_INIT';
export const DATA_LOADING = 'DATA_LOADING';
export const DATA_READY = 'DATA_READY';

export default function chartDataReducer(state = {
  state: DATA_INIT,
}, action) {
  switch(action.type) {
    case CHART_DATA_START_FETCH:
      if(state.state === DATA_LOADING) {
        state.cancelTokenSource.cancel();
      }
      return {
        state: DATA_LOADING,
        cancelTokenSource: action.cancelTokenSource,
      };
    case CHART_DATA_FETCH_SUCCESS:
      return {
        state: DATA_READY,
        data: action.data
      };
    default:
      return state;
  }
}
