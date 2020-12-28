import React from "react";
import {Button} from "react-bootstrap";

const BasicButton = ({bgColor, color, children, onClick}) => (
  <Button
    className='ml-2 mr-2'
    variant='flat'
    style={{
      backgroundColor: bgColor,
      color: color,
      padding: '0.25rem 1.5rem',
      fontSize: '1.5rem'
    }}
    onClick={onClick}
  >{children}</Button>
);

export default BasicButton;
