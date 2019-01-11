
import { FormattedMessage } from 'react-intl';

import ReportFooter from './report_footer';

import styles from './report_cover.scss';
import commonStyles from './common.scss';



import React, { Component} from 'react';
import * as qs from 'qs';
import { connect } from 'react-redux';

import { fetchChartData } from '../action';



class ReportCover extends Component {
  componentDidMount() {
    const { json_url } = qs.parse(this.props.location.search.substr(1));
    this.props.fetchChartData(json_url);
  }

  render() {
      let props = this.props;
    const style = {
        ...(props.style || {})
    };

    //const className = props.className || "";
    if(props.center) {
        style.justifyContent = 'center';
    }
 
    const { chartData } = this.props;
    return (
        <div className={commonStyles.page}>
        <div className={styles.coverTitle} style={{ background: 'url(/image/report-cover.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', }}>
            <div className={styles.title}>
                <h2><FormattedMessage id='report.cover.mainTitle1' defaultMessage='CAMPAIGN REPORT' /></h2>
                <h3><FormattedMessage id='report.cover.mainTitle2' defaultMessage='全球行程中内容分销及服务系统' /></h3>
            </div>
            <h5 className={styles.subtitle}><FormattedMessage id='report.cover.subtitle' defaultMessage='A Global On-Trip Content & Services Distribution System' /></h5>
            <div className={styles.subtitle} style={{ color: '#24d9ed', marginTop: '0.35in' }}><FormattedMessage id='report.cover.companyInfo' defaultMessage='2018 &copy;You World Inc.' /></div>
            <div className={styles.subtitle} style={{ fontWeight: 'normal' }}><FormattedMessage id='report.cover.info' defaultMessage='Privileged and confidential - for discussion purpose only' /></div>
        </div>
        <div className={`${commonStyles.bgGrey} ${styles.overview}`} style={{ borderRadius: "5px"}}>
            <h4><FormattedMessage id='report.cover.overviewLabel' defaultMessage='Overview' /></h4>
            <table className={`${commonStyles.reportTable} ${styles.reportTable}`}>
                <tbody>
                    <tr>
                        <th><FormattedMessage id='report.cover.campaignNameLabel' defaultMessage='Campaign Name' /></th>
                        <td>{chartData.state==="DATA_READY" ? chartData.data.data.name:"loading"}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id='report.cover.channelsLabel' defaultMessage='Channels' /></th>
                        <td>{chartData.state==="DATA_READY" ? chartData.data.data.channels:"loading"}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id='report.cover.startDate' defaultMessage='Start Date' /></th>
                        <td>{chartData.state==="DATA_READY" ? chartData.data.data.time_start:"loading"}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id='report.cover.endDate' defaultMessage='End Date' /></th>
                        <td>{chartData.state==="DATA_READY" ? chartData.data.data.time_end:"loading"}</td>
                    </tr>
                    <tr>
                        <th><FormattedMessage id='report.cover.campaignFormat' defaultMessage='Campaign Format' /></th>
                        <td>{chartData.state==="DATA_READY" ? chartData.data.data.campaign_format:"loading"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ReportFooter />
    </div>
        )
  }
}

export default connect(state => ({
  chartData: state.chartData,
}), {
  fetchChartData,
})(ReportCover);
