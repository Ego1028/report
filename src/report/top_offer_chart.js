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
  
  
  export default function TopOfferChart(props) {
    const data = props.data.report_content;
    return (<Fragment>
      <TopOffersTable data={data.top_offers} />
    </Fragment>);
  }
  