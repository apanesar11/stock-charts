import React from "react";
import {AddStockContainer} from "./add-chart.styles.jsx";
import {BsPlusSquare} from "react-icons/bs";

const AddChartCard = ({ addChart }) => (
  <div className='w-100 h-100 d-flex align-items-center text-center'>
    <AddStockContainer className='mx-auto p-5 m-3'>
      <BsPlusSquare
        style={{ cursor: 'pointer' }}
        size={100}
        onClick={addChart}
      />
    </AddStockContainer>
  </div>
);

export default AddChartCard;