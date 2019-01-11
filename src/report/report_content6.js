
import styles from './report_content.scss';


import React, { Component, Fragment } from 'react';
import * as qs from 'qs';
import { connect } from 'react-redux';

import { fetchChartData } from '../action';
import {
  DATA_LOADING,
  DATA_READY,
} from '../reducer/chart_data';
import OfferDownloads from './offer_downloads';


class ReportContent6 extends Component {
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
                <h1>BOOST CHANNELS OFFER DOWNLOADS</h1>
                <br/>
                <div style={{backgroundColor:"#e0e0e0",width:"30%",display:"inline-block",marginLeft:"20px",marginBottom:"20px",marginTop:"15px",borderRadius:"5px"}}>
                    <p style={{paddingLeft:"15px",fontSize:'13px'}}>OFFER DOWNLOADS<sup>①</sup></p>
                    <p style={{paddingLeft:"15px"}}> {chartData.state==="DATA_READY" ? chartData.data.data.report_content.offer_saves:"loading"} </p>
                </div>
                <h3>OFFER DOWNLOADS BREAKDOWN BY CHANNELS</h3>
                <Fragment>
                    {/*<div>{JSON.stringify(qs.parse(this.props.location.search.substr(1)))}</div>*/}
                    {(chartData.state === DATA_LOADING) && (<div>Loading...</div>)}
                    {(chartData.state === DATA_READY) && <OfferDownloads {...chartData.data} />}
                </Fragment>

                <p style={{fontWeight:"lighter",fontSize:"11px"}}>① OFFER DOWNLOADS: The total number of offers downloads on all Boost channels.</p>
                
            </div>
        )
    
  }
}

export default connect(state => ({
  chartData: state.chartData,
}), {
  fetchChartData,
})(ReportContent6);
