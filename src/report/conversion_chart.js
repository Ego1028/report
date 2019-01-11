import React, {
    Fragment,
  } from 'react';
  import {
    reduxForm,
    formValueSelector,

  } from 'redux-form';
  import { connect } from 'react-redux';
 
  
  import ConversionChart from '../charts/ConversionChart';
 
  
  function ChartArea(props) {
    const width = props.width || 100;
    const height = props.height || 100;
    return (<div>
      <div style={{width: `${width}%`, height: `${height}%`}}>
        {props.children}
      </div>
    </div>);
  }
  
  function createChartArea(form, initialValues) {
    const selector = formValueSelector(form);
    return reduxForm({
      form,
      initialValues: {
        width: '100',
        height: '100',
        ...initialValues,
      },
    })(connect(state => selector(state, 'width', 'height'))(ChartArea));
  }


  const ConversionChartArea = createChartArea('conversionChart');
  
  export default function ConversionTable(props) {
    const data = props.data.report_content;
    return (<Fragment>
      <ConversionChartArea>
        <ConversionChart data={[
          { name: "Offer Views", y: data.offer_views },
          { name: "Offer Clicks", y: data.offer_clicks },
          { name: "Offer Downloads", y: data.offer_saves },
          //{ name: "Store Visits", y: data.unique_store_visits },
        ]}/>
      </ConversionChartArea>
    </Fragment>);
  }
  