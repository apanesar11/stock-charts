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
      <Col md={10}>
        <div className='text-left pt-1 pb-1'>
          <span className='h1'>{ticker} - </span><span className='h2'>{name}</span>
        </div>
      </Col>
      <Col md={2}>
        <BsPlusSquare
          size={addSize}
          className='mx-auto'
          style={{cursor: 'pointer'}}
          onMouseEnter={() => setAddSize(50)}
          onMouseLeave={() => setAddSize(40)}
          onClick={addStockToResults}
        />
      </Col>
    </Row>
  );
};

export default SearchItem;
