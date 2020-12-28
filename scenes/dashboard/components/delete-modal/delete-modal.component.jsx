import React from "react";
import {Button, Modal} from "react-bootstrap";
import {IoIosCloseCircleOutline} from "react-icons/io";
import BasicButton from "./components/basic-button/basic-button.component";

const constants = {
  HEADING: 'Are you sure?',
  SUBHEADING: 'Do you really want to remove this stock? This action cannot be undone.'
};

const DeleteModal = ({ show, onModalCancel, onModelDelete }) => {
  return (
    <Modal show={show} size="md" aria-labelledby="close-modal" centered>
      <Modal.Body className='p-5'>
        <div className='text-center'>
          <IoIosCloseCircleOutline size={100} color='#F15F5E'/>
          <h1 className='text-secondary mt-4'>{constants.HEADING}</h1>
          <h5 className='text-muted mt-4'>{constants.SUBHEADING}</h5>
          <div className='mx-auto mt-5'>
            <BasicButton bgColor='#C1C1C1' color='white' onClick={onModalCancel}>
              Cancel
            </BasicButton>
            <BasicButton bgColor='#F15F5E' color='white' onClick={onModelDelete}>
              Delete
            </BasicButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
