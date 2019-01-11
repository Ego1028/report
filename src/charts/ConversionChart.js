import React from 'react';
import ReactHighcharts from 'react-highcharts';
import { injectIntl } from 'react-intl';

function createConversionArrowDrawer() {
    const objects = [];
    return {
        clear: function () {
            for(let object of objects) {
                object.destroy();
            }
            objects.length = 0;
        },
        draw: function (chart) {
            const r = chart.renderer;
            const data = chart.series[0].data;
            const colors = ReactHighcharts.Highcharts.getOptions().colors;
            for(let i = 0; i < data.length - 1; i++) {
                const dy = 10;
                const //gap = data[i + 1].plotX - data[i].plotX - data[i].pointWidth,
                    //margin = gap / 5,
                startX = data[i].plotX + chart.plotLeft + data[i].pointWidth / 2,
                startY = data[i].plotY + chart.plotTop,
                endX = data[i + 1].plotX + chart.plotLeft - data[i + 1].pointWidth / 2,
                endY = data[i + 1].plotY + chart.plotTop,
                bottom = chart.plotTop + chart.plotHeight,
                arrowX = (startX + endX) / 2,
                arrowY = Math.min((startY + endY) / 2, chart.plotTop + chart.plotHeight - 30),
                area = ['M', startX, startY, 'L', endX, endY, 'L', endX, bottom, 'L', startX, bottom],
                arrow = ['M', arrowX - 30 + 3, arrowY - 14 + dy, 'L', arrowX + 30 + 3, arrowY - 14 + dy, 'L', arrowX + 35 + 3, arrowY + dy, 'L', arrowX + 30 + 3, arrowY + 14 + dy, 'L', arrowX - 30 + 3, arrowY + 14 + dy, 'L', arrowX - 30 + 3, arrowY - 14 + dy];
                objects.push(r.path(area).attr({
                    fill: (colors[0]) + "40"
                }).add());
                objects.push(r.path(arrow).attr({
                    fill: "#666", "stroke-width": 1, stroke: colors[1],
                }).add());
                objects.push(r.label(Math.round((data[i + 1].y / data[i].y) * 1000) / 10 + "%", arrowX, arrowY)
                    .css({
                        fontSize: '10px',
                        color: '#fff',
                        textAnchor: "middle",
                    })
                    .add()
                );
            }

        }
    }
}

// props:
// {
//     title: Message;
//     data: { name: string, y: number }[]
// }

function ConversionChart(props) {
    function tryParseMessage(message) {
        return typeof message === "string"
          ? message
          : typeof message === "object"
          ? props.intl.formatMessage(message)
          : "";
    }
    const { clear, draw } = createConversionArrowDrawer();
    const config = {
        title: { text: tryParseMessage(props.title) },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:0.f}',
                },
            },
        },
        legend: { enabled: false },
        yAxis: { title: { text: null } },
        xAxis: { type: 'category' },
        series: [{
            type: 'column',
            data: props.data.map(({ name, y }) => ({
                name: tryParseMessage(name),
                y,
            })),
            maxPointWidth: 50,
        }],
        chart: {
            events: {
                load: function () { draw(this); },
                redraw: function() {
                    clear();
                    draw(this);
                },
            }
        }
    };
    return <ReactHighcharts config={config} />;
}

export default injectIntl(ConversionChart);
