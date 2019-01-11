import styles from './report_content.scss';


import React, { Component, Fragment } from 'react';
import * as qs from 'qs';
import { connect } from 'react-redux';

import { fetchChartData } from '../action';
import {
  DATA_LOADING,
  DATA_READY,
} from '../reducer/chart_data';
import TopStoreChart from './top_store_chart';


class ReportContent5 extends Component {
  componentDidMount() {
    const { json_url } = qs.parse(this.props.location.search.substr(1));
    this.props.fetchChartData(json_url);
  }

  render() {
      let props = this.props;
    const style = {
        ...(props.style || {})
    };

    const className = props.className || "";
    if(props.center) {
        style.justifyContent = 'center';
    }
 
    const { chartData } = this.props;
    return (
            <div className={`${styles.sectionContent} ${className}`} style={style}>
                <h2>LAUNCH CHANNELS - TOP STORES</h2>
                <Fragment>
                    {/*<div>{JSON.stringify(qs.parse(this.props.location.search.substr(1)))}</div>*/}
                    {(chartData.state === DATA_LOADING) && (<div>Loading...</div>)}
                    {(chartData.state === DATA_READY) && <TopStoreChart {...chartData.data} />}
                </Fragment>
                <br/>
            
            </div>
        )
    
  }
}

export default connect(state => ({
  chartData: state.chartData,
}), {
  fetchChartData,
})(ReportContent5);
