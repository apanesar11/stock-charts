import React, {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import Navbar from "../../components/navbar/navbar.component";
import StockChart from "./components/stock-chart/stock-chart.component";

import {getStockData} from "../../api";
import DeleteModal from "./components/delete-modal/delete-modal.component";

const constants = {
  STOCKS: [
    {ticker: 'GOOG'},
    {ticker: 'PLTR'},
    {ticker: 'TSLA'},
    {ticker: 'SPY'},
    {ticker: 'AMD'},
    //{ticker: 'ZM'}
  ]
};

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState(null);

  const getData = async tickers => {
    setResults([])
    for (const ticker of tickers) {
      const res = await getStockData(ticker);
      const histData = res.data;
      await setResults(results => [...results, { ticker, data: histData }]);
    }
    if (results.length < 6) {
      setResults(results => [...results, { ticker: null, data: [] }]);
    }
  };
  
  useEffect(() => {
    const tickers = constants.STOCKS.map(stock => stock.ticker);
    getData(tickers)
  }, []);

  const removeChart = ticker => {
    setShowModal(true);
    setSelectedTicker(ticker);
  };

  const addChart = () => {
    console.log('adding chart.')
  };

  const onModalCancel = () => {
    setShowModal(false);
    setSelectedTicker(null);
  };

  const onModelDelete = () => {
    setResults(results => results.filter(({ticker}) => ticker !== selectedTicker))
    onModalCancel();
  };

  return (
    <>
      <Navbar/>
      <DeleteModal show={showModal} onModalCancel={onModalCancel} onModelDelete={onModelDelete}/>
      <Container fluid className='mt-5 pt-3'>
        <Row className='pl-lg-5 pl-sm-0 pr-lg-5 pr-sm-0'>
          {
            results.map(({ticker, data}, id) => (
              <Col className='d-flex flex-column' key={`stock-${ticker}-${id}`} sm={12} lg={6} xl={4}>
                <StockChart ticker={ticker} data={data} removeChart={removeChart} addChart={addChart}/>
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
