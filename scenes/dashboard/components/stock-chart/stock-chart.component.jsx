import React, {useState} from "react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import {Circle} from "better-react-spinkit";
import TickerBox from "./components/ticker-box/ticker-box.component";
import {AiOutlineClose} from "react-icons/ai";
import {BsPlusSquare} from "react-icons/bs";
import {ChartContainer, CloseContainer, AddStockContainer} from "./stock-chart.styles";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StockChart = ({ ticker, data, removeChart, addChart }) => {
  const [showChart, setShowChart] = useState(false);

  const options = {
    chart: {
      height: 350,
      type: 'candlestick',
      events: {
        mounted: function (chartContext, config) {
          setShowChart(true)
        },
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
      type: 'category',
      labels: {
        formatter: function(val) {
          return dayjs(val).format('MMM DD')
        },
        style: {
          fontSize: '10px'
        }
      }
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
    <ChartContainer className={`h-100 mb-5 p-3`}>
      { ticker &&
        <TickerBox ticker={ticker}/>
      }
      { showChart && ticker &&
        <CloseContainer>
          <AiOutlineClose
            size={20}
            onClick={() => removeChart(ticker)}
          />
        </CloseContainer>
      }
      { ticker &&
        <Chart
          options={options}
          series={series}
          type="candlestick"
          width="100%"
        />
      }
      { !showChart && ticker &&
        <div
          style={{ height: '328px' }}
          className='w-100 d-flex align-items-center text-center'
        >
          <Circle size={100} className='mx-auto'/>
        </div>
      }
      { !ticker &&
        <div className='w-100 h-100 d-flex align-items-center text-center'>
          <AddStockContainer className='mx-auto p-5 m-3'>
            <BsPlusSquare
              style={{ cursor: 'pointer' }}
              size={100}
              onClick={addChart}
            />
          </AddStockContainer>
        </div>
      }
    </ChartContainer>
  );
};

export default StockChart;
