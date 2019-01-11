import React from 'react';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import styles from './report_footer.scss';

export default function ReportFooter(props) {
    return (
    <footer className={ styles.footer }>
        
        <span style={{marginLeft:"1in"}}> {props.pages==null ? '': 'Pages: '+props.pages} </span>
        <span className={styles.footerCaption} style={{marginLeft:'6in'}}><FormattedMessage id='report.fotter.dateLabel' defaultMessage='Report Date' /></span>
        <span >{ moment().format('YYYY-MM-DD') }</span>
    </footer>
    );
}

