import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchDesks } from "../Redux/Actions/DeskAction";
import {
    LikeFilled,
    StarFilled,
    LockOutlined,
    GlobalOutlined,
    HighlightOutlined,
    EditOutlined,
  } from "@ant-design/icons";
import { Skeleton } from "antd";
export default function SearchResults() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {searchData, loadItem} =  useSelector(state => state.DesksReducer);
  let { keyword } = useParams();


  const contentMyDesks = (data) => {
    if (data)
    return data.map((item, index) => {
      let starScore = 0;
      if (item.rates) {
        item.rates?.map((item) => (starScore += item.star));
        if (item.rates?.length > 0)
          starScore = (starScore / item.rates?.length).toFixed();
      }
      return (
        <div
          onClick={() => {
            navigate(`/detaildesk/${18082003 + item.id}`);
          }}
          key={index}
          className="mb-5 duration-100 w-full h-500 relative cursor-pointer hover:bg-slate-100 bg-white shadow-md rounded-sm p-5"
        >
          <p className="m-0 font-bold text-xl w-3/4">{item.name}</p>
          <p className="mb-10 opacity-50">{item.numCard} cards</p>
          <div className="flex align-middle absolute bottom-0 left-5"> 
            <div
              style={{
                backgroundImage: `url(${item.avatar})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="rounded-full w-5 h-5 mr-2"
            ></div>
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
  }

  const showContentSearch = () => {
    if(!loadItem)
    return (searchData[0] ? contentMyDesks(searchData) : <p>No result!</p>);
    else return <Skeleton active/>
  }
  useEffect(() => {
    dispatch(SearchDesks(keyword))
}, []);
  return (
    <div className="relative z-10  md:container md:mx-auto md:w-3/4 mx-5 py-5">
      <p
        className="text-blue-500 cursor-pointer w-12 mb-2 hover:text-blue-400"
        onClick={() => {
          navigate(-1);
        }}
      >{`< Back`}</p>
      <p className="text-lg border-b">
        Results for <b>{keyword}</b>
      </p>
      {showContentSearch()}
    </div>
  );
}
