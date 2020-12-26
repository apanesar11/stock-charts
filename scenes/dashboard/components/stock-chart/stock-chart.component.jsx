import React from "react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import {Jumbotron} from "react-bootstrap";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StockChart = ({ ticker, data }) => {

  const options = {
    chart: {
      height: 350,
      type: 'candlestick',
    },
    title: {
      text: ticker,
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
    <Jumbotron
      className='mb-4 p-3'
      style={{
        borderRadius: '20px',
        backgroundColor: 'white'
      }}
    >
      <Chart
        options={options}
        series={series}
        type="candlestick"
        width="100%"
      />
    </Jumbotron>
  );
};

export default StockChart;
