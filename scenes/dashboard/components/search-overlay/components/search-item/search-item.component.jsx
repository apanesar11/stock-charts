import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import {BsPlusSquare} from "react-icons/bs";

const SearchItem = ({ ticker, name, addStock, setModalVisible}) => {
  const [addSize, setAddSize] = useState(40);

  const addStockToResults = () => {
    addStock(ticker);
    setModalVisible(false);
  };

  return (
    <Row className='mt-2 d-flex align-items-center'>
      <Col md={10}>
        <div className='text-left pt-1 pb-1'>
          <span className='h1'>{ticker} - </span><span className='h2'>{name}</span>
        </div>
      </Col>
      <Col md={2}>
        <BsPlusSquare
          size={addSize}
          className='mx-auto'
          style={{cursor: 'pointer'}}
          onMouseEnter={() => setAddSize(50)}
          onMouseLeave={() => setAddSize(40)}
          onClick={addStockToResults}
        />
      </Col>
    </Row>
  );
};

export default SearchItem;
