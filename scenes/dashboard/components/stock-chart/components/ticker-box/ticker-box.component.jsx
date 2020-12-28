import React from "react";

const TickerBox = ({ ticker }) => (
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
);

export default TickerBox;
