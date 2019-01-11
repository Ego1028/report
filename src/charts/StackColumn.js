import React from 'react';
import ReactHighcharts from 'react-highcharts';
import { injectIntl } from 'react-intl';

// {
//     yAxisMax?: number;
//     yAxis: Message;
//     title: Message;
//     data: { x: number [] } & Record<string, number[]>
//     colors: Record<string, string>,
// }

function StackColumn(props) {
  const formatMessage = props.intl.formatMessage;
  const title = props.title ? formatMessage(props.title) : "";
  const yAxisTitle = props.yAxis ? formatMessage(props.yAxis) : "";
  const yAxis = {
    title: { text: yAxisTitle },
    stackLabels: { enabled: true },
  };
  if(props.yAxisMax) {
    yAxis.max = props.yAxisMax;
  }
  const config = {
      chart: { type: 'column' },
      title: { text: title },
      xAxis: { categories: props.data.x, },
      yAxis,
      plotOptions: {
          column: { stacking: 'normal', },
      },
      series: Object.keys(props.data).filter(name => name !== 'x').map(name => {
          const ret = {
            name,
            data: props.data[name],
          };
          if(props.colors && props.colors[name]) {
              ret.color = props.colors[name];
          } else {
              ret.color = props.colors['Others'];
          }
          return ret;
      }),
  };
  if(props.legend) {
    config.legend = props.legend;
  }
  return <ReactHighcharts domProps={{ style: { display: 'block', height: '100%', width: '100%' }}} config={config}/>;
}

export default injectIntl(StackColumn);
