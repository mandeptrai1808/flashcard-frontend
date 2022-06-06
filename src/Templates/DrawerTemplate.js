import React from 'react'
import { Drawer, Button } from 'antd';
import {useSelector, useDispatch} from "react-redux"
import MenuItem from '../Components/MenuItem';

export default function DrawerTemplate() {
  const {visible, content, placement} = useSelector(state => state.DrawerReducer);
  const dispatch = useDispatch();
  return (
    <div>
         <Drawer width={"300"}  placement={placement} onClose={() => {
           dispatch({type: "CLOSE_DRAWER"});
         }} visible={visible}>
           {content}
      </Drawer>
    </div>
  )
}
