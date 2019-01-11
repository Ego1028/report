import React from 'react';
import ReactHighcharts from 'react-highcharts';
import { injectIntl } from 'react-intl';

// props
// {
//     title: Message;
//     data: {
//         name: string;
//         y: number;
//     }[]
// }

function Pie(props) {
    const formatMessage = props.intl.formatMessage;
    const title = props.title ? formatMessage(props.title) : "";
    const config = {
        chart: { type: 'pie' },
        title: { text: title },
        plotOptions: { pie: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f}%<br>{point.y}',
            }
        } },
        series: [{
            name: "Channels",
            data: props.data,
        }],
    };
    return <ReactHighcharts domProps={{ style: { display: 'block', height: '100%', width: '100%' }}} config={config}/>;
}

export default injectIntl(Pie);

