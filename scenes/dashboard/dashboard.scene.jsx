import React, {useState, useEffect} from "react";
import {Container, Row, Col, Modal, Button} from "react-bootstrap";
import {IoIosCloseCircleOutline} from "react-icons/io";
import Navbar from "../../components/navbar/navbar.component";
import StockChart from "./components/stock-chart/stock-chart.component";

import {getStockData} from "../../api";
import DeleteModal from "./components/delete-modal/delete-modal.component";

const constants = {
  STOCKS: [
    {ticker: 'TCDA'},
    {ticker: 'PLTR'},
    {ticker: 'TSLA'},
    {ticker: 'SPY'},
    {ticker: 'AMD'},
    {ticker: 'ZM'}
  ]
};

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState(null);

  const getData = tickers => {
    setResults([])
    tickers.forEach(async ticker => {
      const res = await getStockData(ticker);
      const histData = res.data;
      setResults(results => [...results, { ticker, data: histData }]);
    });
  };
  
  useEffect(() => {
    const tickers = constants.STOCKS.map(stock => stock.ticker);
    getData(tickers)
  }, []);

  const removeChart = ticker => {
    setShowModal(true);
    setSelectedTicker(ticker);
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
              <Col key={`stock-${ticker}-${id}`} sm={12} lg={6} xl={4}>
                <StockChart ticker={ticker} data={data} removeChart={removeChart}/>
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
