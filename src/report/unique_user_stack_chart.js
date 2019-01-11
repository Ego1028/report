import React, {
    Fragment,
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
 
  
  import StackColumn from '../charts/StackColumn';

  
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

  const colors = {
    'Website': '#0cd4ea',
    'YW Miniapp': '#51c331',
    'Ctrip': '#2577e3',
    'China Unicom': '#d61920',
    'Alipay': '#2ea6de',
    'Dian Ping': '#ea5405',
    'Mafengwo': '#fbb400',
    'Zuzuche': '#013291',
    'Huizuche': '#10bc8c',
    'Jego': '#ff0081',
    'Guruin': '#7c7c7c',
    'Others': '#800080'
};
  
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
  
  export default function UniqueUser(props) {
    const data = props.data.report_content;
    return (<Fragment>
      <UsersPerChannelsChart data={data.users_per_channels}/>
    </Fragment>);
  }
  