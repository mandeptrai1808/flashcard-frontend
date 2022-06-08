import React, {useEffect} from "react";
import { Tabs } from 'antd';
import { LikeFilled, StarFilled, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { GetDesksByUserId } from "../Redux/Actions/DeskAction";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

export default function Desks() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const navigate = useNavigate();


  const dispatch = useDispatch();
  const {myDesks} = useSelector(state => state.DesksReducer);

  const contentMyDesks = myDesks.map((item, index) => {
    return  <div onClick={()=>{
    
      navigate(`/detaildesk/${18082003+item.id}`)
    }} key={index} className="mb-5 duration-100 w-full h-500 relative cursor-pointer hover:bg-slate-100 bg-white shadow-md rounded-sm p-5">
    <p className="m-0 font-bold text-xl">{item.name}</p>
    <p className="mb-10 opacity-50">{item.numCard} cards</p>
    <div  className="flex align-middle absolute bottom-0 left-5">
      <img
        src={item.avatar}
        alt="avt"
        className="rounded-full w-5 h-5 mr-2"
      />
      <p>{item.username}</p>
    </div>
    <div className="flex absolute bottom-0 right-5">
      <p className="mr-2"><LikeFilled style={{color: "blueviolet"}}/> {item.likes}</p>
      <p><StarFilled style={{color: "yellowgreen"}}/> {item.rates <= 0 ? "Chưa có đánh giá": `${item.rates}`}</p>
    </div>
    <div>
      <p className="mr-2 absolute top-5 right-5">{item.status === "PRIVATE" ? <LockOutlined/> : <GlobalOutlined />}</p>
    </div>
  </div>
  })

  useEffect(() => {
   dispatch(GetDesksByUserId(userData.id));
  }, [])
  

  return (
    <div className="relative z-10 md:container md:mx-auto md:w-3/4 mx-5 py-5">
      <div className="flex">
        <div className="rounded-full border-2 w-16 h-16 mr-5  flex justify-center  text-xl overflow-hidden">
          <img src={userData.avatar} alt="avt"></img>
        </div>
        <div>
          <p className="mb-0 mt-1 text-2xl font-bold">{userData.name}</p>
          <p className="opacity-70">{userData.email}</p>
        </div>
      </div>

      <div>
      <Tabs defaultActiveKey="1">
    <TabPane tab="Your desks" key="1">
    {contentMyDesks}
    </TabPane>
    <TabPane tab="History" key="2">
     History
    </TabPane>
    <TabPane tab="Update profile" key="3">
      Update profile
    </TabPane>
  </Tabs>
      </div>

    </div>
  );
}
