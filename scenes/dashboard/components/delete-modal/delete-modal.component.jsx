import React, {useContext} from "react";
import {Modal} from "react-bootstrap";
import {IoIosCloseCircleOutline} from "react-icons/io";
import BasicButton from "./components/basic-button/basic-button.component";

import {UiContext} from "../../../../contexts/ui/ui.context";
import {toggleDeleteModal} from "../../../../contexts/ui/ui.actions";

import {DataContext} from "../../../../contexts/data/data.context";
import {deleteStockData} from "../../../../contexts/data/data.actions";

const constants = {
  HEADING: 'Are you sure?',
  SUBHEADING: 'Do you really want to remove this stock? This action cannot be undone.'
};

const DeleteModal = () => {
  const { state: uiState, dispatch: uiDispatch } = useContext(UiContext);
  const { state: dataState, dispatch: dataDispatch } = useContext(DataContext);

  const onDelete = () => {
    const { selectedStock } = dataState;
    dataDispatch(deleteStockData(selectedStock));
    uiDispatch(toggleDeleteModal());
  };

  return (
    <Modal show={uiState.showDeleteModal} size="md" aria-labelledby="close-modal" centered>
      <Modal.Body className='p-5'>
        <div className='text-center'>
          <IoIosCloseCircleOutline size={100} color='#F15F5E'/>
          <h1 className='text-secondary mt-4'>{constants.HEADING}</h1>
          <h5 className='text-muted mt-4'>{constants.SUBHEADING}</h5>
          <div className='mx-auto mt-5'>
            <BasicButton bgColor='#C1C1C1' color='white' onClick={() => uiDispatch(toggleDeleteModal())}>
              Cancel
            </BasicButton>
            <BasicButton bgColor='#F15F5E' color='white' onClick={onDelete}>
              Delete
            </BasicButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
