import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './report_header.scss';

export default function ReportHeader() {
    return (<>
    <div className={styles.header}>
        <div>
            <span className={styles.caption}>
                <FormattedMessage id='report.header.caption1' defaultMessage='Campaign Report' />
            </span>
            <span style={{ marginLeft: '0.1in', marginRight: '0.1in' }}>|</span>
            <FormattedMessage id='report.header.caption2' defaultMessage='You World Inc. Privileged and Confidential' />
        </div>
        <img src="/image/report-header-logo.png" alt='cannot load' />
    </div>
    </>);
}
