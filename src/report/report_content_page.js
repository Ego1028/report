import React from 'react';

import ReportHeader from './report_header';
import ReportFooter from './report_footer';
import ReportContent1 from './report_content1';
import commonStyles from './common.scss';
import ReportContent2 from './report_content2';
import ReportContent3 from './report_content3';
import ReportContent4 from './report_content4';
import ReportContent5 from './report_content5';
import ReportContent6 from './report_content6';
export default function ReportContentPage(props) {
    return (
    <div className={commonStyles.page}>
        <ReportHeader />
        <ReportContent1 location={props.location}/>
        <hr/>
        <ReportFooter pages={1}/>
        <ReportHeader />
        <ReportContent2  location={props.location} />
        <hr/>
        <ReportFooter pages={2}/>
        <ReportHeader />
        <ReportContent3  location={props.location} />
        <hr/>
        <ReportFooter pages={3}/>
        <ReportHeader />
        <ReportContent4  location={props.location} />
        <hr/>
        <ReportFooter pages={4}/>
        <ReportHeader />
        <ReportContent5  location={props.location} />
        <hr/>
        <ReportFooter pages={5}/>
        <ReportHeader />
        <ReportContent6  location={props.location} />
        <hr/>
        <ReportFooter pages={6}/>
    </div>
    );
}

