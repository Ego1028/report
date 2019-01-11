import React, {
  Fragment,
  createContext,
  createRef,
  Component,
} from 'react';
import {
  reduxForm,
  formValueSelector,
  Field,
  FieldArray,
} from 'redux-form';
import { connect } from 'react-redux';
import { FormattedNumber } from 'react-intl';

import StackColumn from './charts/StackColumn';
import ConversionChart from './charts/ConversionChart';
import Pie from './charts/Pie';

import styles from './ChartsTemplate.module.scss';

//import ReportFooter from './report/report_footer';

function ChartArea(props) {
  const width = props.width || 100;
  const height = props.height || 100;
  return (<div>
    <div style={{width: `${width}%`, height: `${height}%`}}>
      {props.children}
    </div>
    <div>
      <label>width</label>
      <Field name="width" component="input" type="number" min="0" max="100"/><span>%</span>
    </div>
    <div>
      <label>height</label>
      <Field name="height" component="input" type="number" min="0" max="100"/><span>%</span>
    </div>
  </div>);
}

function createChartArea(form, initialValues) {
  const selector = formValueSelector(form);
  return reduxForm({
    form,
    initialValues: {
      width: '100',
      height: '100',
      ...initialValues,
    },
  })(connect(state => selector(state, 'width', 'height'))(ChartArea));
}

const TableAreaContext = createContext({ data: [] });

function TableArea(props) {
  let { data, numberOfItems, width } = props;
  const max = Math.max(data.length, 10);
  data = data.slice(0, numberOfItems);
  width = width || 100;
  return (<div style={{ width: '100%' }}>
    <div style={{width: `${width}%`}}>
      <TableAreaContext.Provider value={{ data }}>
        {props.children}
      </TableAreaContext.Provider>
    </div>
    <div>
      <label>width</label>
      <Field name="width" component="input" type="number" min="0" max="100"/><span>%</span>
    </div>
    <div>
      <label>number of rows</label>
      <Field name="numberOfItems" component="input" type="number" max={max} min="1"/>
    </div>
  </div>);
}

function createTableArea(form) {
  const selector = formValueSelector(form);
  return reduxForm({
    form,
    initialValues: {
      width: '100',
      numberOfItems: '10',
    },
  })(connect(state => selector(state, 'width', 'numberOfItems'))(TableArea));
}

const colors = {
    'Website': '#0cd4ea',
    'YW-Wechat-Miniapp': '#51c331',
    'Ctrip': '#2577e3',
    'China Unicom': '#d61920',
    'Alipay': '#2ea6de',
    'Dian Ping': '#ea5405',
    'MFW': '#fbb400',
    'Zuzuche': '#013291',
    'Huizuche': '#10bc8c',
    'Jego': '#ff0081',
    'Guruin': '#7c7c7c',
    'Others': '#800080'
};
const toNumber = val => +val || 0;
const renderOfferDownloadsByChannels = ({ fields }) => (<div>
  {fields.map(( field, index ) => (<div key={index}>
    <button onClick={() => fields.remove(index)}>remove</button>
    <label>channel name</label>
    <Field name={`${field}.name`} component="input"/>
    <label>offer downloads</label>
    <Field name={`${field}.y`} component="input" parse={toNumber}/>
  </div>))}
  <button onClick={() => fields.push({ name: "", y: 0 })}>add a channel</button>
</div>);
const OfferDownloadsByChannelsChartArea = createChartArea('offerDownloadsByChannelsChartArea');
const offerDownloadsByChannelsSelector = formValueSelector('offerDownloadsByChannels');
const OfferDownloadsByChannelsChart = connect((state, ownProps) => ({
  data: offerDownloadsByChannelsSelector(state, 'data'),
  initialValues: {
    data: ownProps.data,
  },
}))(
  reduxForm({
    form: 'offerDownloadsByChannels',
  })(props => (<div>
    <OfferDownloadsByChannelsChartArea>
      <Pie data={props.data}/>
    </OfferDownloadsByChannelsChartArea>
    <FieldArray name="data" component={renderOfferDownloadsByChannels}/>
  </div>))
);

const TopOffersTableArea = createTableArea('topOffersTable');

function TopOffersRow({ name, clicks, saves }) {
  return (<tr style={{ borderBottom: '1px #ddd solid' }}>
    <td>{name}</td>
    <td><FormattedNumber value={clicks} /></td>
    <td><FormattedNumber value={saves} /></td>
  </tr>);
}

function TopOffersTable({ data }) {
  data = data.slice();
  data.sort((lhs, rhs) => {
    if(lhs.clicks !== rhs.clicks) {
      return rhs.clicks - lhs.clicks;
    }
    return rhs.saves - lhs.saves;
  });
  return (<TopOffersTableArea data={data}>
    <table className={styles.reportTable}>
      <thead>
        <tr>
          <td>Offer Name</td>
          <td>Offer Clicks</td>
          <td>Offer Downloads</td>
        </tr>
      </thead>
      <tbody>
        <TableAreaContext.Consumer>{({ data }) =>
          data.map(offer => (<TopOffersRow key={offer.sheet_offer_id} {...offer}/>))
        }</TableAreaContext.Consumer>
      </tbody>
    </table>
  </TopOffersTableArea>);
};

const TopStoresTableArea = createTableArea('topStoresTable');

function TopStoresRow({ formatted_address, clicks, saves, page_views }) {
  return (<tr style={{ borderBottom: '1px #ddd solid' }}>
    <td>{formatted_address}</td>
    <td>{page_views}</td>
    <td><FormattedNumber value={clicks} /></td>
    <td><FormattedNumber value={saves} /></td>
  </tr>);
}

function TopStoresTable({ data }) {
  data = data.slice();
  data.sort((lhs, rhs) => {
    if(lhs.page_views !== rhs.page_views) {
      return rhs.page_views - lhs.page_views;
    }
    if(lhs.clicks !== rhs.clicks) {
      return rhs.clicks - lhs.clicks;
    }
    return rhs.saves - lhs.saves;
  });
  return (<TopStoresTableArea data={data}>
    <table className={styles.reportTable}>
      <thead>
        <tr>
          <td>Store Name</td>
          <td>Page Views</td>
          <td>Offer Clicks</td>
          <td>Offer Downloads</td>
        </tr>
      </thead>
      <tbody>{
        <TableAreaContext.Consumer>{({ data }) =>
          data.map(store => (<TopStoresRow key={`${store.theme_type}:${store.theme_entity_id}`} {...store}/>))
        }</TableAreaContext.Consumer>
      }</tbody>
    </table>
  </TopStoresTableArea>);
}

const UsersPerChannelsChartArea = createChartArea('userPerChannelsChart', {
  columnsPerRow: '15',
});

class StackColumns extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.forceUpdate());
  }
  
  render() {
    const { data } = this.props;
    const yAxisMax = Math.max(...data.x.map((_, index) => Object.keys(data)
      .filter(key => key !== 'x')
      .map(key => data[key][index])
      .reduce((acc, cur) => acc + cur, 0)
    ));
    let columnsPerRow = Math.min(15, data.x.length);
    if(this.ref.current) {
      columnsPerRow = Math.round(this.ref.current.clientWidth / 55);
      if(columnsPerRow === 0) {
        columnsPerRow = 1;
      }
    }
    const datas = [];
    for(let i = 0; i < data.x.length; i += columnsPerRow) {
      datas.push(Object.assign({}, ...Object.keys(data).map(
        key => ({ [key]: data[key].slice(i, i + columnsPerRow)})
      )));
    }
    return (<div style={{ width: "100%" }} ref={this.ref}>
      {datas.map((data, i) => (<div key={i} style={{ width: `${data.x.length / columnsPerRow * 100}%`}}>
        <StackColumn yAxisMax={yAxisMax} data={data} legend={{enabled: i === 0, verticalAlign: 'top'}} colors={colors}/>
      </div>))}
    </div>);
  }
}

const UsersPerChannelsChart = ({ data }) => {
  return (<Fragment>
    <UsersPerChannelsChartArea>
      <StackColumns data={data} />
    </UsersPerChannelsChartArea>
  </Fragment>);
}
const ConversionChartArea = createChartArea('conversionChart');

export default function ChartsTemplate(props) {
  const data = props.data.report_content;
  return (<Fragment>
    <UsersPerChannelsChart data={data.users_per_channels}/>
    <ConversionChartArea>
      <ConversionChart data={[
        { name: "Offer Views", y: data.offer_views },
        { name: "Offer Clicks", y: data.offer_clicks },
        { name: "Offer Downloads", y: data.offer_saves },
        { name: "Store Visits", y: data.unique_store_visits },
      ]}/>
    </ConversionChartArea>
    <TopOffersTable data={data.top_offers} />
    <TopStoresTable data={data.top_pois}/>
    <OfferDownloadsByChannelsChart data={Object.keys(data.offer_downloads).map(key => ({
      name: key,
      y: data.offer_downloads[key],
    }))}/>
  </Fragment>);
}
