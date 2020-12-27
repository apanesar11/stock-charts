import React, {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import Navbar from "../../components/navbar/navbar.component";
import StockChart from "./components/stock-chart/stock-chart.component";
import {getStockData} from "../../api";

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
  
  return (
    <>
      <Navbar/>
      <Container fluid className='mt-5 pt-5'>
        <Row className='pl-lg-5 pl-sm-0 pr-lg-5 pr-sm-0'>
          {
            results.map(({ticker, data}, id) => (
              <Col key={`stock-${ticker}-${id}`} sm={12} lg={6} xl={4}>
                <StockChart ticker={ticker} data={data} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
