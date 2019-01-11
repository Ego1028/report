import React, { Component, Fragment } from 'react';
import * as qs from 'qs';
import { connect } from 'react-redux';

import { fetchChartData } from './action';
import {
  DATA_LOADING,
  DATA_READY,
} from './reducer/chart_data';
import ChartsTemplate from './ChartsTemplate';


class ReportCharts extends Component {
  componentDidMount() {
    const { json_url } = qs.parse(this.props.location.search.substr(1));
    this.props.fetchChartData(json_url);
  }

  render() {
    const { chartData } = this.props;
    return (<Fragment>
      {/*<div>{JSON.stringify(qs.parse(this.props.location.search.substr(1)))}</div>*/}
      {(chartData.state === DATA_LOADING) && (<div>Loading...</div>)}
      {(chartData.state === DATA_READY) && <ChartsTemplate {...chartData.data} />}
    </Fragment>);
  }
}

export default connect(state => ({
  chartData: state.chartData,
}), {
  fetchChartData,
})(ReportCharts);
