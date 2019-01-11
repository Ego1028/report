import styles from './report_content.scss';


import React, { Component} from 'react';
import * as qs from 'qs';
import { connect } from 'react-redux';

import { fetchChartData } from '../action';


class ReportContent1 extends Component {
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
        <h1>Overview</h1>
        <br/>
        <h4 style={{color:"#818387"}}>An overview of key data from all channels (Launch, Boost and Curated).</h4>
        <p style={{fontSize:"12px"}}>LAUNCH - Mafengwo, China Unicom, Huizuche, Jego, Zuzuche, Guruin, YW WeChat Mini Program & more</p>
        <p style={{fontSize:"12px"}}>BOOST - Ctrip Global Shopping, Dianping, Fliggy, Alipay Discover & more</p>
        <p style={{fontSize:"12px"}}>CURATED - WeChat Moment Ads & more</p>
        <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",marginBottom:"20px",marginTop:"15px",borderRadius:"5px"}}>
            <p style={{paddingLeft:"15px",fontSize:'13px'}}>UPDATED POIS<sup>①</sup></p>
            <p style={{paddingLeft:"15px"}}> {chartData.state==="DATA_READY" ? chartData.data.data.report_content.number_of_updated_pois:"loading"} </p>
        </div>
        <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",borderRadius:"5px"}}>
            <p style={{paddingLeft:"15px",fontSize:'13px'}}>UPDATED OFFERS<sup>②</sup></p>
            <p style={{paddingLeft:"15px"}}>{chartData.state==="DATA_READY" ? chartData.data.data.report_content.number_of_updated_offers:"loading"}</p>
        </div>
        <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",borderRadius:"5px"}}>
            <p style={{paddingLeft:"15px",fontSize:'13px'}}>TOTAL USERS<sup>③</sup></p>
            <p style={{paddingLeft:"15px"}}>N/A</p>
        </div>
        <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",marginBottom:"40px",borderRadius:"5px"}}>
            <p style={{paddingLeft:"15px",fontSize:'13px'}}>OFFER VIEWS<sup>④</sup></p>
            <p style={{paddingLeft:"15px"}}>{chartData.state==="DATA_READY" ? chartData.data.data.report_content.offer_views:"loading"}</p>
        </div>
        <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",borderRadius:"5px"}}>
            <p style={{paddingLeft:"15px",fontSize:'13px'}}>OFFER CLICKS<sup>⑤</sup></p>
            <p style={{paddingLeft:"15px"}}>{chartData.state==="DATA_READY" ? chartData.data.data.report_content.offer_clicks:"loading"}</p>
        </div>
        <div style={{backgroundColor:"#e0e0e0",width:"30%",fontSize:'13px',display:"inline-block",marginLeft:"20px",borderRadius:"5px"}}>
            <p style={{paddingLeft:"15px",fontSize:'13px'}}>OFFER DOWNLOADS<sup>⑥</sup></p>
            <p style={{paddingLeft:"15px"}}>{chartData.state==="DATA_READY" ? chartData.data.data.report_content.offer_saves:"loading"}</p>
        </div>
        <br/>
        <hr style={{marginTop:'2in'}}/>
        <p style={{fontWeight:"lighter",fontSize:"11px"}}>① UPDATED POIS: The total number of POIs that have been updated or maintained within the campaign dates on this report.</p>
        <p style={{fontWeight:"lighter",fontSize:"11px"}}>② UPDATED OFFERS: The total number of offers that have been updated or maintained within tbe campaign dates on this report.</p>
        <p style={{fontWeight:"lighter",fontSize:"11px"}}>③ TOTAL USERS: The total number of users from all Launch, Boost (estimated) and Curated channels.</p>
        <p style={{fontWeight:"lighter",fontSize:"11px"}}>④ OFFER VIEWS: The total number of offer impressions on all Launch, Boost (estimated) and Curated channels.</p>
        <p style={{fontWeight:"lighter",fontSize:"11px"}}>⑤ OFFER CLICKS: The total number of offer clicks that have occured on all Launch, Boost (estimated) and Curated channels.</p>
        <p style={{fontWeight:"lighter",fontSize:"11px"}}>⑥ OFFER DOWNLOADS: The total number offer downloads that have occured on all Launch, Boost and Curated channels.</p>
    </div>
        )
    
  }
}

export default connect(state => ({
  chartData: state.chartData,
}), {
  fetchChartData,
})(ReportContent1);
