import { intlReducer } from 'react-intl-redux';
import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';

import chartData from './chart_data';

export default combineReducers({
  intl: intlReducer,
  form,
  chartData,
});
