import React, {
    Fragment,
  } from 'react';
  import {
    reduxForm,
    formValueSelector,
    FieldArray,
  } from 'redux-form';
  import { connect } from 'react-redux';

  import Pie from '../charts/Pie';

  
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

  const renderOfferDownloadsByChannels = ({ fields }) => (<div>
    {fields.map(( field, index ) => (<div key={index}>
    </div>))}
    
  </div>);
  const OfferDownloadsByChannelsChartArea = createChartArea('offerDownloadsByChannelsChartArea');
  const offerDownloadsByChannelsSelector = formValueSelector('offerDownloadsByChannels');
  const OfferDownloadsByChannelsChart = connect((state, ownProps) => ({
    data: offerDownloadsByChannelsSelector(state, 'data'),
    initialValues: {
      data: ownProps.data,
    },
  }))(
    reduxForm({
      form: 'offerDownloadsByChannels',
    })(props => (<div>
      <OfferDownloadsByChannelsChartArea>
        <Pie data={props.data}/>
      </OfferDownloadsByChannelsChartArea>
      <FieldArray name="data" component={renderOfferDownloadsByChannels}/>
    </div>))
  );

  
  export default function ConversionTable(props) {
    const data = props.data.report_content;
    return (<Fragment>
    <OfferDownloadsByChannelsChart data={Object.keys(data.offer_downloads).map(key => ({
      name: key,
      y: data.offer_downloads[key],
    }))}/>
    </Fragment>);
  }
  