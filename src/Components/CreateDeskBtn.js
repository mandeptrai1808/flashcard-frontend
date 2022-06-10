import React from "react";
import { useDispatch } from "react-redux";
import CreateDesk from "./CreateDesk";
import Login from "./Login";
export default function CreateDeskBtn() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);
  const dispatch = useDispatch();
  return (
    <div className="fixed duration-200 cursor-pointer font-bold z-20 bottom-10 hover:scale-125 right-5 w-12 h-12 bg-red-600 text-white md:hidden block rounded-full flex justify-center items-center"
    onClick={(e)=>{
      if (!userData) {
       dispatch({
         type: "OPEN_DRAWER", 
         content: <Login/>,
         placement: "right"
       })
       e.preventDefault()
     }
   
     else
     dispatch({
       type: "OPEN_MODAL",
       content: <CreateDesk/>,
       title: "Create Desk"
     })
   }}>
      +
    </div>
  );
}
