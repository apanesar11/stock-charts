import React, {useState} from "react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import {Circle} from "better-react-spinkit";
import TickerBox from "./components/ticker-box/ticker-box.component";
import {AiOutlineClose} from "react-icons/ai";
import {CloseContainer} from "./stock-chart.styles";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StockChart = ({ ticker, data, removeChart, showToolbar }) => {
  const [showChart, setShowChart] = useState(false);

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
        show: showToolbar
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
            onClick={() => removeChart(ticker)}
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
