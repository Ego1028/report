import React from 'react';
import {
  formValueSelector,
  reduxForm,
  Field
} from 'redux-form';
import { connect } from 'react-redux';

const selector = formValueSelector('home');

function Home (props) {
  const { history } = props;
  return (
    <div>
      <label>data json url</label>
      <Field name="jsonUrl" component="input"/>
      <button onClick={() => history.push(`/?json_url=${encodeURIComponent(props.jsonUrl)}`)}>generate charts</button>
    </div>
  );
}

export default reduxForm({
  form: 'home',
  initialValues: {
    jsonUrl: "http://portal-backend.youworld.us/api/yw-admin/get-report?report_id=7",
  },
})(connect(state => ({
  jsonUrl: selector(state, 'jsonUrl'),
}))(Home));
