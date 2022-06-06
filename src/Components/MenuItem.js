import React from 'react'
import "./MenuStyle.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


export default function MenuItem() {
    const navigate = useNavigate();
    const {listItem, isActive} = useSelector(state => state.MenuItemReducer);
    const dispatch = useDispatch();
    const content = listItem.map((item, index) => {
      let classActive = "";
      let addressNavigate = "";
      if (isActive === index) classActive = "active";
      if (index === 0) addressNavigate = "/";
      if (index === 1) addressNavigate = "/desks";
      if (index === 2) addressNavigate = "/about"; 
      return  <div
      onClick={()=>{
          dispatch({
              type: "CHANGE_PAGE",
              key: index
          })
          navigate(addressNavigate)
          
      }}
      className={`${classActive} mt-5 duration-100 cursor-pointer border-blue-500 px-3 mr-10 hover:border-b-4`}
    >
      {item}
    </div>
    })
  return (
    <div>

         <div className="h-full pt-4">
            {content}  
         
        </div>
    </div>
  )
}
