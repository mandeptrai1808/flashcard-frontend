import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetDeskById } from "../Redux/Actions/DeskAction";
import {
  LikeFilled,
  StarFilled,
  ShareAltOutlined,
  OrderedListOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import CarouselCard from "../Components/CarouselCard";
import ShareDesk from "../Components/ShareDesk";

export default function DetailDesk() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);
  if (!userData) userData = {};
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { deskDetail, cards } = useSelector((state) => state.DesksReducer);

  let params = useParams();
  let hashId = params.deskId;
  hashId -= 18082003;
  useEffect(() => {
    dispatch(GetDeskById(hashId));
  }, []);

  let contentShowCard = (
    <div className="w-full h-96 flex justify-center items-center rounded-sm shadow-md border">
      {cards.length > 0 ? (
        <CarouselCard setHeight={300}/>
      ) : (
        <div className="text-xl font-bold text-center">
          <p>This desk don't have any cards!</p>
          <p>Click Edit to add more</p>
        </div>
      )}
    </div>
  );
  return (
    <div className="relative z-10 md:container md:mx-auto md:w-3/4 mx-5 py-5">
      <div className="mb-5 pb-5 border-b-2">
        <div className="flex justify-between items-center">
        <h1 className="m-0 text-3xl font-bold">{deskDetail.name}</h1>
        <p className="opacity-50">Made by: {deskDetail.username}</p>
        </div>
        <p className="opacity-50">{`${cards.length} cards`}</p>
        <div>
          <span className="mr-5">
            <LikeFilled style={{ color: "blueviolet" }} /> 69
          </span>
          <span>
            <StarFilled style={{ color: "yellowgreen" }} />
            5/5
          </span>
        </div>
      </div>
      <div className="grid grid-cols-10">
        <div className="col-span-3 md:block hidden md:w-32">
          <Button onClick={() => {
              navigate(`/learn/${18082003 + hashId}`);
            }}  type="primary" className="md:w-32">
            Learn
          </Button>
          <p
            onClick={() => {
              navigate(`/listcard/${18082003 + hashId}`);
            }}
            className="md:my-5 md:h-10 h-full text-blue-500 cursor-pointer border-b hover:text-blue-400"
          >
            {" "}
            <OrderedListOutlined /> List card
          </p>
          <p
            onClick={() => {
              dispatch({
                type: "OPEN_MODAL",
                content: <ShareDesk hashId={18082003+ hashId}/>,
                title: "Create Desk"
              })
            }}
            className="md:my-5 md:h-10 h-full text-blue-500 cursor-pointer border-b hover:text-blue-400"
          >
            {" "}
            <ShareAltOutlined /> Share
          </p>
          {userData.id === deskDetail.userId ? (
            <Button
              onClick={() => {
                navigate(`/editdesk/${18082003 + hashId}`);
              }}
              type="danger"
              className="md:w-32 md:mt-10"
            >
              {" "}
              <EditOutlined /> Edit Desk
            </Button>
          ) : (
            ""
          )}
        </div>

        <div className="md:col-span-7 col-span-10 mb-5">{contentShowCard}</div>

        <div className="md:col-span-3 col-span-10 md:hidden flex justify-around md:w-32">
          <Button onClick={() => {
              navigate(`/learn/${18082003 + hashId}`);
            }} type="primary" className="md:w-32">
            Learn
          </Button>
          <p  onClick={() => {
              navigate(`/listcard/${18082003 + hashId}`);
            }} className="md:my-5 md:h-10 h-full text-blue-500 cursor-pointer border-b hover:text-blue-400">
            {" "}
            <OrderedListOutlined /> List card
          </p>
          <p
            onClick={() => {
              console.log("click");
              dispatch({
                type: "OPEN_MODAL",
                content: <ShareDesk hashId={18082003+hashId}/>,
                title: "Share Desk",
              });
            }}
            className="md:my-5 md:h-10 h-full text-blue-500 cursor-pointer border-b hover:text-blue-400"
          >
            {" "}
            <ShareAltOutlined /> Share
          </p>
          {userData.id === deskDetail.userId ? (
            <Button
              onClick={() => {
                navigate(`/editdesk/${18082003 + hashId}`);
              }}
              type="danger"
              className="md:w-32 md:mt-10"
            >
              {" "}
              <EditOutlined /> Edit Desk
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
