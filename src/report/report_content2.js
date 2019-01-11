
import styles from './report_content.scss';


import React, { Component, Fragment } from 'react';
import * as qs from 'qs';
import { connect } from 'react-redux';

import { fetchChartData } from '../action';
import {
  DATA_LOADING,
  DATA_READY,
} from '../reducer/chart_data';
import UniqueUser from './unique_user_stack_chart';


class ReportContent2 extends Component {
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
                <h1>LAUNCH CHANNELS USER ENGAGEMENT</h1>
                <br/>
                <div style={{backgroundColor:"#e0e0e0",width:"30%",display:"inline-block",marginLeft:"20px",marginBottom:"20px",marginTop:"15px",borderRadius:"5px"}}>
                    <p style={{paddingLeft:"15px",fontSize:'13px'}}>TOTAL USERS<sup>①</sup></p>
                    <p style={{paddingLeft:"15px"}}>N/A</p>
                </div>
                <div style={{backgroundColor:"#e0e0e0",width:"30%",display:"inline-block",marginLeft:"20px",borderRadius:"5px"}}>
                    <p style={{paddingLeft:"15px",fontSize:'13px'}}>BRAND PAGE VIEWS<sup>②</sup></p>
                    <p style={{paddingLeft:"15px"}}>{chartData.state==="DATA_READY" ? chartData.data.data.report_content.brand_page_views:"loading"}</p>
                </div>
                <div style={{backgroundColor:"#e0e0e0",width:"30%",display:"inline-block",marginLeft:"20px",borderRadius:"5px"}}>
                    <p style={{paddingLeft:"15px",fontSize:'13px'}}>UNIQUE BRAND PAGE VIEWS<sup>③</sup></p>
                    <p style={{paddingLeft:"15px"}}>{chartData.state==="DATA_READY" ? chartData.data.data.report_content.unique_brand_page_views:"loading"}</p>
                </div>
                <h3>TOTAL USERS BREAKDOWN BY CHANNELS</h3>
                <Fragment>
                    {/*<div>{JSON.stringify(qs.parse(this.props.location.search.substr(1)))}</div>*/}
                    {(chartData.state === DATA_LOADING) && (<div>Loading...</div>)}
                    {(chartData.state === DATA_READY) && <UniqueUser {...chartData.data} />}
                </Fragment>
                <br/>
                <hr/>
                <p style={{fontWeight:"lighter",fontSize:"11px"}}>① TOTAL USERS: The total number of users that have engaged with either a POI or an offer. (Includes views, clicks and downloads)</p>
                <p style={{fontWeight:"lighter",fontSize:"11px"}}>② BRAND PAGE VIEWS: The total number of times that users have visited the custom brand bage.</p>
                <p style={{fontWeight:"lighter",fontSize:"11px"}}>③ UNIQUE BRAND PAGE VIEWS: The unique number of users have visited the custom brand bage.</p>
            </div>
        )
    
  }
}

export default connect(state => ({
  chartData: state.chartData,
}), {
  fetchChartData,
})(ReportContent2);
