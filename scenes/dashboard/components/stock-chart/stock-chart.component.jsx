import React, {useContext, useState} from "react";
import dynamic from "next/dynamic";
import {Circle} from "better-react-spinkit";
import TickerBox from "./components/ticker-box/ticker-box.component";
import {AiOutlineClose} from "react-icons/ai";
import {CloseContainer} from "./stock-chart.styles";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import {UiContext} from "../../../../contexts/ui/ui.context";
import {toggleDeleteModal} from "../../../../contexts/ui/ui.actions";

import {DataContext} from "../../../../contexts/data/data.context";
import {updateSelectedStock} from "../../../../contexts/data/data.actions";

const StockChart = ({ ticker, data }) => {
  const { state: uiState, dispatch: uiDispatch } = useContext(UiContext);
  const { dispatch: dataDispatch } = useContext(DataContext);
  const [showChart, setShowChart] = useState(false);

  const onRemoveChart = () => {
    dataDispatch(updateSelectedStock(ticker));
    uiDispatch(toggleDeleteModal());
  };

  const options = {
    chart: {
      height: 350,
      type: 'candlestick',
      events: {
        mounted: function (chartContext, config) {
          setShowChart(true)
        },
      },
      toolbar: {
        show: !uiState.showSearchOverlay
      }
    },
    title: {
      text: '',
      align: 'left'
    },
    annotations: {
      xaxis: []
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  const series = [
    {
      name: 'candle',
      data
    }
  ];

  return (
    <>
      <TickerBox ticker={ticker}/>
      { showChart &&
        <CloseContainer>
          <AiOutlineClose
            size={20}
            onClick={onRemoveChart}
          />
        </CloseContainer>
      }
      <Chart
        options={options}
        series={series}
        type="candlestick"
        width="100%"
      />
      { !showChart &&
        <div
          style={{ height: '328px' }}
          className='w-100 h-100 d-flex align-items-center text-center'
        >
          <Circle size={100} className='mx-auto p-5 m-3'/>
        </div>
      }
    </>
  );
};

export default StockChart;
