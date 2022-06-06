import React from 'react'
import { Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
export default function ModalTemplate() {
    const {visible, content, title} = useSelector(state => state.ModalReducer);
    const dispatch = useDispatch();
  return (
    <div>
         <Modal title={title} visible={visible}  onCancel={() => {
           dispatch({type: "CLOSE_MODAL"});
         }}>
        {content}
      </Modal>
    </div>
  )
}
