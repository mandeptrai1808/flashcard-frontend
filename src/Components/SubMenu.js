import React from 'react'
import "./MenuStyle.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { SearchDesks } from '../Redux/Actions/DeskAction';
import Login from './Login';

const { Search } = Input;


export default function SubMenu() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);
  
    const navigate = useNavigate();
    const {visible} = useSelector(state => state.SubMenuReducer)
    const {listItem, isActive} = useSelector(state => state.MenuItemReducer);
    const dispatch = useDispatch();

    let classOpenSubMenu = "";
    if (visible) classOpenSubMenu = "h-500 p-4";
    else classOpenSubMenu = "h-0";

    const content = listItem.map((item, index) => {
      let classActive = "";
      let addressNavigate = "";
      let funcBt = () => {
        
      }
      if (isActive === index) classActive = "active";
      if (index === 0) {
        addressNavigate = "/";
        funcBt = () => {
          dispatch({
            type: "CHANGE_PAGE",
            key: index
        })
        dispatch({type: "TOUCH_SUBMENU"})
        navigate(addressNavigate)
        window.location.reload()
        
        }
      }
      if (index === 1) {
        addressNavigate = "/desks";
       funcBt = () => {
        if (!userData) {
          dispatch({
            type: "OPEN_DRAWER", 
            content: <Login/>,
            placement: "right"
          })
          // e.preventDefault()
        }
      
        else
       { dispatch({
          type: "CHANGE_PAGE",
          key: index
      })
      dispatch({type: "TOUCH_SUBMENU"})
      navigate(addressNavigate)}
       }
      }
      if (index === 2) {
        addressNavigate = "/about"; 
        funcBt = () => {
          dispatch({
            type: "CHANGE_PAGE",
            key: index
        })
        dispatch({type: "TOUCH_SUBMENU"})
        navigate(addressNavigate)
        }
      }
      return  <div key={index}
      onClick={()=>{
          // dispatch({
          //     type: "CHANGE_PAGE",
          //     key: index
          // })
          // dispatch({type: "TOUCH_SUBMENU"})
          // navigate(addressNavigate)
          funcBt()
          
      }}
      className={`${classActive} mt-5 duration-100 cursor-pointer border-blue-500 px-3 mr-10 hover:border-b-4`}
    >
      {item}
    </div>
    })
  return (
    <div className='relative z-10'>

        <div className={`bg-white overflow-hidden w-full  md:hidden block shadow-md  ${classOpenSubMenu}`}>
        <Search
         onSearch={(value) => {
          navigate(`/searchresults/${value}`)
          dispatch({type: "IS_LOADING"});
          dispatch(SearchDesks(value));
          dispatch({type: "TOUCH_SUBMENU"})
        }}
            placeholder="Search Desk..."
            className="pt-3 "
            style={{ width: "100%" }}
          />
            {content}  
        </div>
    </div>
  )
}
