import { Button, Input, Popover, Badge } from "antd";
import React from "react";
import { NotificationOutlined, MenuOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import "./MenuStyle.css";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";
import CreateDesk from "./CreateDesk";

const { Search } = Input;
export default function MenuHeader() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const {isLogin} = useSelector(state => state.LoginReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const contentAvatar = (
    <div>
      <div onClick={()=>{
        navigate("/desks")
      }} className="p-2 cursor-pointer border-b hover:bg-slate-100">
        Profile
      </div>
      <div className="p-2 cursor-pointer border-b hover:bg-slate-100">
        Change password
      </div>
      <div onClick={()=>{
         localStorage.removeItem("access_token");
         localStorage.removeItem("login_user");
         navigate("/");
         dispatch({type: "IS_LOGIN"})
      }} className="p-2 cursor-pointer text-red-600 font-bold border-b hover:bg-slate-100">
        Log out
      </div>
    </div>
  );

  const contentNotification = (
    <div>
      <div className="p-2 cursor-pointer border-b hover:bg-slate-100">
        Profile
      </div>
      <div className="p-2 cursor-pointer border-b hover:bg-slate-100">
        Change password
      </div>
      <div className="p-2 cursor-pointer border-b hover:bg-slate-100">
        Profile
      </div>
      <div className="p-2 cursor-pointer border-b hover:bg-slate-100">
        Change password
      </div>
    </div>
  );

  let contentControl = (
    <div className="flex justify-around w-full pt-3">
      <div className="mr-2 md:block hidden">
      <Button type="danger" onClick={()=>{
        dispatch({
          type: "OPEN_DRAWER", 
          content: <SignUp/>,
          placement: "right"
        })
      }}>Sign Up</Button>

      </div>
      <Button type="primary" onClick={()=>{
        dispatch({
          type: "OPEN_DRAWER", 
          content: <Login/>,
          placement: "right"
        })
      }}>Login</Button>
    </div>
  );

  if (userData)
    contentControl = (
      <div className="flex justify-around w-full md:pt-2 pt-4">
        <Badge dot={true}>
          <Popover
            content={contentNotification}
            trigger="click"
            className="focus:shadow-md cursor-pointer  rounded-full border-2 md:w-10 md:h-10 w-7 h-7 flex justify-center md:pt-2 md:text-xl pt-1 text-sm"
          >
            <NotificationOutlined style={{ opacity: 0.5 }} />
          </Popover>
        </Badge>
        <Popover
          content={contentAvatar}
          trigger="click"
          className="shadow-md cursor-pointer rounded-full border-2 md:w-10 md:h-10 w-7 h-7  flex justify-center  text-xl overflow-hidden"
        >
          <div className="w-full h-full"
             style={{backgroundImage: `url(${userData.avatar})`,
             backgroundPosition: 'center',
             backgroundSize: 'cover'}}
          ></div>
        </Popover>
      </div>
    );

  return (
    <div className="h-14 relative z-20 px-5 shadow-md w-full grid grid-cols-10 bg-white">
      <div className="md:hidden block col-span-2 pt-3">
        <Button
          onClick={() => {
            dispatch({
              type: "TOUCH_SUBMENU",
            });
          }}
        >
          <MenuOutlined />
        </Button>
      </div>
      <div
        onClick={() => {
          navigate("/");
        }}
        className="md:col-span-2 cursor-pointer col-span-6 text-center font-bold text-blue-600 text-2xl pt-2"
      >
        FLASHCARD
      </div>
      <div className="col-span-4 hidden md:block">
        <div className="flex h-full">
          <NavLink
            onClick={() => {
              dispatch({
                type: "CHANGE_PAGE",
                key: 0,
              });
            }}
            to="/"
            className="pt-4 duration-100 cursor-pointer border-blue-500 px-3 mr-10 hover:border-b-4"
          >
            Home
          </NavLink>
          <NavLink
            onClick={(e) => {
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
                type: "CHANGE_PAGE",
                key: 1,
              });
            }}
            to={"/desks"}
            className="pt-4 duration-100 cursor-pointer border-blue-500 px-3 mr-10 hover:border-b-4"
          >
            Desks
          </NavLink>
          <NavLink
            onClick={() => {
              dispatch({
                type: "CHANGE_PAGE",
                key: 2,
              });
            }}
            to="/page3"
            className="pt-4 duration-100 cursor-pointer border-blue-500 px-3 mr-10 hover:border-b-4"
          >
            About
          </NavLink>
          <Button onClick={(e)=>{
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
          }} type="danger" className="mt-3">Create Desk</Button>
        </div>
      </div>
      <div className="col-span-2 md:col-span-3 flex justify-end">
        <div className="md:block hidden">
          <Search
            placeholder="Search Desk..."
            className="pt-3 mr-10"
            style={{ width: 250 }}
          />
        </div>
       {contentControl}
      </div>
    </div>
  );
}
