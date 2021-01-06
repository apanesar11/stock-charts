import Head from "next/head";
import React, {useEffect, useContext} from "react";
import {Container, Row, Col} from "react-bootstrap";
import Navbar from "../../components/navbar/navbar.component";
import PageLoading from "../../components/page-loading/page-loading.component";
import StockChart from "./components/stock-chart/stock-chart.component";
import DeleteModal from "./components/delete-modal/delete-modal.component";
import SearchOverlay from "./components/search-overlay/search-overlay.component";
import AddChartCard from './components/add-chart/add-chart.component';
import {ChartContainer, StyledEdiText} from "./dashboard.styles";

import {UiContext} from "../../contexts/ui/ui.context";
import {toggleDashboardLoading} from "../../contexts/ui/ui.actions";

import {DataContext} from "../../contexts/data/data.context";
import {updateStockViews, updateCurrentView, updateStockData} from "../../contexts/data/data.actions";

import {getStockData as getStockDataAPI} from "../../api";

const constants = {
  DEFAULT_VIEWS: [
    {
      view: 'Technology Stocks',
      stocks: [
        {ticker: 'AAPL'},
        {ticker: 'MSFT'},
        {ticker: 'AMZN'},
        {ticker: 'GOOG'},
        {ticker: 'FB'}
      ]
    },
    {
      view: 'Covid Stocks',
      stocks: [
        {ticker: 'ZM'},
        {ticker: 'PFE'},
        {ticker: 'MRNA'},
        {ticker: 'DIS'},
        {ticker: 'SPY'},
      ]
    }
  ]
};

const Dashboard = () => {
  const { state: uiState, dispatch: uiDispatch } = useContext(UiContext);
  const { state: dataState, dispatch: dataDispatch } = useContext(DataContext);

  useEffect(() => {
    const views = localStorage.getItem('views');
    console.log(views);
    const stockViews = views ? JSON.parse(views) : constants.DEFAULT_VIEWS
    dataDispatch(updateStockViews(stockViews))
    dataDispatch(updateCurrentView(stockViews[0].view))
    const tickersArr = stockViews[0].stocks.map(stock => stock.ticker);
    (async () => {
      for (const ticker of tickersArr) {
        const res = await getStockDataAPI(ticker);
        const { data } = res;
        await dataDispatch(updateStockData({ ticker, data }));
      }
      uiDispatch(toggleDashboardLoading());
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Stock Charts {dataState.currentView ? `| ${dataState.currentView}`: ''}</title>
      </Head>
      <Navbar/>
      <PageLoading loading={uiState.dashboardLoading}>
        <DeleteModal/>
        <SearchOverlay />
        <Col
          md={3} xs={6}
          className='mx-auto text-center p-1 position-relative text-center h5'
          style={{
            marginTop: '-1.75vw',
            backgroundColor: 'white',
            border: 'solid 1px #24292C'
          }}
        >
          <StyledEdiText
            type='text'
            value={dataState.currentView}
            onSave={value => dataDispatch(updateCurrentView(value))}
            showButtonsOnHover
            viewProps={{
              style: { width: '100%', padding: '0px' }
            }}
          />
        </Col>
        <Container fluid className='mt-4 pt-3'>
          <Row className='pl-lg-5 pl-sm-0 pr-lg-5 pr-sm-0'>
            {
              dataState.stockData.map(({ticker, data}, id) => (
                <Col className='d-flex flex-column' key={`stock-${ticker}-${id}`} sm={12} lg={6} xl={4}>
                  <ChartContainer className={`h-100 mb-5 p-3`}>
                    <StockChart ticker={ticker} data={data}/>
                  </ChartContainer>
                </Col>
              ))
            }
            { !uiState.dashboardLoading && dataState.stockData.length < 6 &&
              <Col className='d-flex flex-column' key={`stock-add-ticker`} sm={12} lg={6} xl={4}>
                <ChartContainer className={`h-100 mb-5 p-3`}>
                  <AddChartCard/>
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
