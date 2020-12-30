import React, {useState, useEffect} from "react";
import {Container, Row, Col} from "react-bootstrap";
import Navbar from "../../components/navbar/navbar.component";
import PageLoading from "../../components/page-loading/page-loading.component";
import StockChart from "./components/stock-chart/stock-chart.component";
import DeleteModal from "./components/delete-modal/delete-modal.component";
import SearchOverlay from "./components/search-overlay/search-overlay.component";
import AddChartCard from './components/add-chart/add-chart.component';
import {ChartContainer} from "./dashboard.styles";

import {getStockData as getStockDataAPI} from "../../api";

const constants = {
  DEFAULT_STOCKS: [
    {ticker: 'AAPL'},
    {ticker: 'MSFT'},
    {ticker: 'AMZN'},
    {ticker: 'GOOG'},
    {ticker: 'FB'}
  ]
};

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const getStockData = async ticker => {
    const res = await getStockDataAPI(ticker);
    const histData = res.data;
    await setResults(results => [...results, { ticker, data: histData }]);
  };
  
  useEffect(() => {
    let tickers;
    const ls = localStorage.getItem('stocks');
    if (ls) {
      tickers = JSON.parse(localStorage.getItem('stocks'))
    } else {
      tickers = constants.DEFAULT_STOCKS
    }
    setStocks(tickers);
    const tickersArr = tickers.map(stock => stock.ticker);
    (async () => {
      setResults([])
      for (const ticker of tickersArr) {
        await getStockData(ticker);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [stocks]);

  const addStock = async ticker => {
    setLoading(true);
    await getStockData(ticker);
    await setStocks(stocks => [...stocks, { ticker }]);
    setLoading(false);
  };

  const removeChart = ticker => {
    setShowModal(true);
    setSelectedTicker(ticker);
  };

  const addChart = () => {
    console.log('adding chart.');
    setSearchVisible(true);
  };

  const onModalCancel = () => {
    setShowModal(false);
    setSelectedTicker(null);
  };

  const onModelDelete = () => {
    onModalCancel();
    setResults(results => results.filter(({ticker}) => ticker !== selectedTicker));
    setStocks(stocks => stocks.filter(({ticker}) => ticker !== selectedTicker));
  };

  return (
    <>
      <Navbar/>
      <PageLoading loading={loading}>
        <DeleteModal show={showModal} onModalCancel={onModalCancel} onModelDelete={onModelDelete}/>
        { searchVisible &&
          <SearchOverlay setModalVisible={setSearchVisible} addStock={addStock}/>
        }
        <Container fluid className='mt-5 pt-3'>
          <Row className='pl-lg-5 pl-sm-0 pr-lg-5 pr-sm-0'>
            {
              results.map(({ticker, data}, id) => (
                <Col className='d-flex flex-column' key={`stock-${ticker}-${id}`} sm={12} lg={6} xl={4}>
                  <ChartContainer className={`h-100 mb-5 p-3`}>
                    <StockChart ticker={ticker} data={data} removeChart={removeChart} showToolbar={!searchVisible}/>
                  </ChartContainer>
                </Col>
              ))
            }
            { !loading && results.length < 6 &&
              <Col className='d-flex flex-column' key={`stock-add-ticker`} sm={12} lg={6} xl={4}>
                <ChartContainer className={`h-100 mb-5 p-3`}>
                  <AddChartCard addChart={addChart}/>
                </ChartContainer>
              </Col>
            }
          </Row>
        </Container>
      </PageLoading>
    </>
  );
};

export default Dashboard;
