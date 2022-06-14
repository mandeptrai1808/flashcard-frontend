import React from 'react'
import { Space, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
export default function Loading() {
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.LoginReducer);
  return (
    <div className={`w-screen ${isLoading ? "flex":"hidden"} justify-center items-center h-screen bg-black bg-opacity-50 fixed top-0 bottom-0 z-40`}>
         <Spin size="large" />
    </div>
  )
}
