import React, {useState} from "react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import {Circle} from "better-react-spinkit";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StockChart = ({ ticker, data }) => {
  const [showChart, setShowChart] = useState(false);

  const onBeforeMount = () => {
    console.log('before mount');
  };

  const mounted = () => {
    console.log('mounted');
  };

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
    <div
      className='mb-5 p-3'
      style={{
        borderRadius: '6px',
        backgroundColor: 'white',
        height: '350px'
      }}
    >
      <div
        className='text-light d-flex align-items-center'
        style={{
          marginTop: '-40px',
          width: '60px',
          height: '60px',
          backgroundColor: '#24292C',
          borderRadius: '3px'
        }}
      >
        <div className='w-100'>
          <h5 className='text-center m-0'>{ticker}</h5>
        </div>
      </div>
      <Chart
        options={options}
        series={series}
        type="candlestick"
        width="100%"
      />
      { !showChart &&
        <div className='h-100 w-100 d-flex align-items-center text-center'>
          <Circle
            size={100}
            className='mx-auto'
          />
        </div>
      }
    </div>
  );
};

export default StockChart;
