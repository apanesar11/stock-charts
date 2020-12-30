import React, {useContext} from "react";
import {AddStockContainer} from "./add-chart.styles.jsx";
import {BsPlusSquare} from "react-icons/bs";

import {UiContext} from "../../../../contexts/ui/ui.context";
import {toggleSearchOverlay} from "../../../../contexts/ui/ui.actions";

const AddChartCard = () => {
  const { dispatch } = useContext(UiContext);
  return(
    <div className='w-100 h-100 d-flex align-items-center text-center'>
      <AddStockContainer className='mx-auto p-5 m-3'>
        <BsPlusSquare
          style={{ cursor: 'pointer' }}
          size={100}
          onClick={() => dispatch(toggleSearchOverlay())}
        />
      </AddStockContainer>
    </div>
  )
};

export default AddChartCard;