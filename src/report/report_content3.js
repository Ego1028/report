import styles from './report_content.scss';


import React, { Component, Fragment } from 'react';
import * as qs from 'qs';
import { connect } from 'react-redux';

import { fetchChartData } from '../action';
import {
  DATA_LOADING,
  DATA_READY,
} from '../reducer/chart_data';
import ConversionTable from './conversion_chart';


class ReportContent3 extends Component {
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
                <h1>LAUNCH CHANNELS OFFER ENGAGEMENT</h1>
                <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",marginBottom:"20px",marginTop:"15px",borderRadius:"5px"}}>
                    <p style={{paddingLeft:"15px",fontSize:'13px'}}>OFFER VIEWS<sup>①</sup></p>
                    <p style={{paddingLeft:"15px"}}> {chartData.state==="DATA_READY" ? chartData.data.data.report_content.offer_views:"loading"}</p>
                </div>
                <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",borderRadius:"5px"}}>
                    <p style={{paddingLeft:"15px",fontSize:'13px'}}>OFFER CLICKS<sup>②</sup></p>
                    <p style={{paddingLeft:"15px"}}>{chartData.state==="DATA_READY" ? chartData.data.data.report_content.offer_clicks:"loading"}</p>
                </div>
                <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",borderRadius:"5px"}}>
                    <p style={{paddingLeft:"15px",fontSize:'13px'}}>OFFER DOWNLOADS<sup>③</sup></p>
                    <p style={{paddingLeft:"15px"}}>{chartData.state==="DATA_READY" ? chartData.data.data.report_content.offer_saves:"loading"}</p>
                </div>
                <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",marginBottom:"40px",borderRadius:"5px"}}>
                    <p style={{paddingLeft:"15px",fontSize:'13px'}}>UNIQUE OFFER CLICKS<sup>④</sup></p>
                    <p style={{paddingLeft:"15px"}}> {chartData.state==="DATA_READY" ? chartData.data.data.report_content.unique_offer_clicks:"loading"}</p>
                </div>
                <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",borderRadius:"5px"}}>
                    <p style={{paddingLeft:"15px",fontSize:'13px'}}>UNIQUE OFFER DOWNLOADS<sup>⑤</sup></p>
                    <p style={{paddingLeft:"15px"}}>{chartData.state==="DATA_READY" ? chartData.data.data.report_content.unique_offer_saves:"loading"}</p>
                </div>
                <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",borderRadius:"5px"}}>
                    <p style={{paddingLeft:"15px",fontSize:'13px'}}>ESTIMATED STORE VISITS<sup>⑥</sup></p>
                    <p style={{paddingLeft:"15px"}}>N/A</p>
                </div>
                <h3>OFFER CONVERSION FUNNEL</h3>
                <Fragment>
                    {/*<div>{JSON.stringify(qs.parse(this.props.location.search.substr(1)))}</div>*/}
                    {(chartData.state === DATA_LOADING) && (<div>Loading...</div>)}
                    {(chartData.state === DATA_READY) && <ConversionTable {...chartData.data} />}
                </Fragment>
                <br/>
                <hr/>
                <p style={{fontWeight:"lighter",fontSize:"11px"}}>① OFFER VIEWS: The total number of offers views that have occured on all Launch channels.</p>
                <p style={{fontWeight:"lighter",fontSize:"11px"}}>② OFFER CLICKS: The total number of offers clicks that have occured on all Launch channels.</p>
                <p style={{fontWeight:"lighter",fontSize:"11px"}}>③ OFFER DOWNLOADS: The total number of offers downloads that have occured on all Launch channels.</p>
                <p style={{fontWeight:"lighter",fontSize:"11px"}}>④ UNIQUE OFFER CLICKS: The unique number of offers clicks that have occured on all Launch channels.</p>
                <p style={{fontWeight:"lighter",fontSize:"11px"}}>⑤ UNIQUE OFFER DOWNLOADS: The unique number of offers downloads that have occured on all Launch channels.</p>
                <p style={{fontWeight:"lighter",fontSize:"11px"}}>⑥ ESTIMATED STORE VISITS: The number of users that were detected within a 100m radius of the store.</p>
            </div>
        )
    
  }
}

export default connect(state => ({
  chartData: state.chartData,
}), {
  fetchChartData,
})(ReportContent3);
