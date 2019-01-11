import React, {
    Fragment,
    createContext,

  } from 'react';
  import {
    reduxForm,
    formValueSelector,

  } from 'redux-form';
  import { connect } from 'react-redux';
  import { FormattedNumber } from 'react-intl';

  import styles from '../ChartsTemplate.module.scss';

  const TableAreaContext = createContext({ data: [] });
  
  function TableArea(props) {
    let { data, numberOfItems, width } = props;
    //const max = Math.max(data.length, 10);
    data = data.slice(0, numberOfItems);
    width = width || 100;
    return (<div style={{ width: '100%' }}>
      <div style={{width: `${width}%`}}>
        <TableAreaContext.Provider value={{ data }}>
          {props.children}
        </TableAreaContext.Provider>
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

  
  export default function TopOfferChart(props) {
    const data = props.data.report_content;
    return (<Fragment>
      <TopStoresTable data={data.top_pois}/>
    </Fragment>);
  }
  