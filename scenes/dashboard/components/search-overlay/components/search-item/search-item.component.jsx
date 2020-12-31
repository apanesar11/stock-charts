import React, {useContext, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {BsPlusSquare} from "react-icons/bs";

import {UiContext} from "../../../../../../contexts/ui/ui.context";
import {toggleSearchOverlay} from "../../../../../../contexts/ui/ui.actions";
import {toggleDashboardLoading} from "../../../../../../contexts/ui/ui.actions";

import {DataContext} from "../../../../../../contexts/data/data.context";
import {updateStockData} from "../../../../../../contexts/data/data.actions";

import {getStockData as getStockDataAPI} from "../../../../../../api";

const SearchItem = ({ ticker, name }) => {
  const { dispatch: uiDispatch } = useContext(UiContext);
  const { dispatch: dataDispatch } = useContext(DataContext);
  const [addSize, setAddSize] = useState(40);

  const addStockToResults = async () => {
    uiDispatch(toggleSearchOverlay());
    uiDispatch(toggleDashboardLoading())
    const res = await getStockDataAPI(ticker);
    const { data } = res;
    await dataDispatch(updateStockData({ ticker, data }));
    uiDispatch(toggleDashboardLoading())
  };

  return (
    <Row className='mt-2 d-flex align-items-center'>
      <Col xs={10} className='mt-2 mb-2'>
        <div className='text-left mt-2 mb-2'>
          <span className='h2'>{ticker} - </span><span className='h3'>{name}</span>
        </div>
      </Col>
      <Col xs={2}>
        <BsPlusSquare
          size={addSize}
          className='mx-auto'
          style={{cursor: 'pointer'}}
          onMouseEnter={() => setAddSize(45)}
          onMouseLeave={() => setAddSize(40)}
          onClick={addStockToResults}
        />
      </Col>
    </Row>
  );
};

export default SearchItem;
