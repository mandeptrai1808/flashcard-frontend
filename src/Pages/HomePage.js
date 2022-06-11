import React, {useEffect, useState} from "react";
import { LikeFilled, StarFilled, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetHistoryDesksByUserId } from "../Redux/Actions/DeskAction";

export default function HomePage() {

  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);
  if (!userData) userData = {};
  let [loadMore, setLoadMore] = useState(4)

  const { myDesks } = useSelector((state) => state.DesksReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetHistoryDesksByUserId(userData.id))
  }, [])

  const contentHistoryDesks = myDesks.map((item, index) => {
    let starScore = 0;
    if (item.rates) {
      item.rates.map((item) => (starScore += item.star));
      if (item.rates.length > 0)
        starScore = (starScore / item.rates.length).toFixed();
    }
    if (index <= loadMore)
    return (
      <div
        onClick={() => {
          navigate(`/detaildesk/${18082003 + item.id}`);
        }}
        key={index}
        className="mb-5 md:col-span-1 col-span-3 duration-100 w-full h-500 relative cursor-pointer hover:bg-slate-100 bg-white shadow-md rounded-sm p-5"
      >
        <p className="m-0 font-bold text-xl w-3/4">{item.name}</p>
        <p className="mb-10 opacity-50">{item.numCard} cards</p>
        <div className="flex align-middle absolute bottom-0 left-5">
          <img
            src={item.avatar}
            alt="avt"
            className="rounded-full w-5 h-5 mr-2"
          />
          {/* <div
            style={{
              backgroundImage: `url(${item.avatar})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="rounded-full w-5 h-5 mr-2"
          ></div> */}
          <p>{item.username}</p>
        </div>
        <div className="flex absolute bottom-0 right-5">
          <p className="mr-2">
            <LikeFilled style={{ color: "blueviolet" }} /> {item.likes?.length}
          </p>
          <p>
            <StarFilled style={{ color: "yellowgreen" }} />{" "}
            {item.rates?.length <= 0 ? "Chưa có đánh giá" : `${starScore}.0`}
          </p>
        </div>
        <div>
          <p className="mr-2 absolute top-5 right-5">
            {item.status === "PRIVATE" ? <LockOutlined /> : <GlobalOutlined />}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="p-5 relative z-10">
      <p className="font-bold">Recently:</p>
      <div className="grid grid-cols-3 gap-4 mb-10">
        
      {userData.id ? contentHistoryDesks : <p className="col-span-3">We will save your history after you loggin</p>}
      <div className="col-span-3 flex justify-center">
      {(loadMore < myDesks.length) && userData.id ? <p 
      className="cursor-pointer text-blue-600 hover:text-blue-500"
      onClick={() => {
        setLoadMore(loadMore + 5)
      }}>More...</p> : ""}
      </div>
      </div>
      <p className="font-bold">Những desks tôts nhất:</p>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="md:col-span-1 col-span-3 duration-100 w-full h-500 relative cursor-pointer hover:bg-slate-100 bg-white shadow-md rounded-sm p-5">
          <p className="m-0 font-bold text-xl">Name of desk</p>
          <p className="mb-10 opacity-50">Number cards</p>
          <div  className="flex align-middle absolute bottom-0 left-5">
            <img
              src="https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg"
              alt="avt"
              className="rounded-full w-5 h-5 mr-2"
            />
            <p>Nameuser</p>
          </div>
        </div>
        <div className="md:col-span-1 col-span-3 duration-100 w-full h-500 relative cursor-pointer hover:bg-slate-100 bg-white shadow-md rounded-sm p-5">
          <p className="m-0 font-bold text-xl">Name of desk</p>
          <p className="mb-10 opacity-50">Number cards</p>
          <div  className="flex align-middle absolute bottom-0 left-5">
            <img
              src="https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg"
              alt="avt"
              className="rounded-full w-5 h-5 mr-2"
            />
            <p>Nameuser</p>
          </div>
          <div className="flex absolute bottom-0 right-5">
            <p className="mr-2"><LikeFilled style={{color: "blueviolet"}}/> 69</p>
            <p><StarFilled style={{color: "yellowgreen"}}/> 9/10</p>
          </div>
        </div>
      </div>
    </div>
  );
}
