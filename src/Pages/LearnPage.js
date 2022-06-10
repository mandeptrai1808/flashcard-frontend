import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetDeskById } from "../Redux/Actions/DeskAction";
import { Button, Progress } from "antd";
import { SwapOutlined, CaretRightOutlined } from "@ant-design/icons";
import CarouselCard from "../Components/CarouselCard";
export default function LearnPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deskDetail, cards, processCard } = useSelector((state) => state.DesksReducer);
  const [sizeOfCarousel, setSizeOfCarousel] = useState(500);



  let params = useParams();
  let hashId = params.deskId;
  hashId -= 18082003;

  useEffect(() => {
    dispatch(GetDeskById(hashId));
    dispatch({type: "RESET_PROCESSCARD"})
  }, []);

  return (
    <div className="relative pb-10 md:flex z-10 md:container md:mx-auto md:w-3/4 w-full">
      <div className="md:flex hidden w-40 p-5 pb-40 h-screen flex-col justify-between shadow-lg">
        <div>
          <p
            onClick={() => {
              navigate(-1);
            }}
            className="mb-10 opacity-50 hover:opacity-100 hover:text-yellow-300 cursor-pointer"
          >
            {"< Back"}
          </p>
          <p className="font-bold">{deskDetail.name}</p>
          <Progress
            trailColor={"rgba(66,87,178,.3)"}
            percent={processCard*100/(cards.length)}
            showInfo={false}
          />
          <div className="flex justify-between">
            <p>Process</p>
            <p>{`${processCard}/ ${cards.length}`}</p>
          </div>
        </div>
        <div>
          <Button onClick={() => {
            dispatch({type: "SUFFLE_CARDS"})
          }} className="w-full mb-5">
            {" "}
            <SwapOutlined /> Suffle
          </Button>
          <Button className="w-full" type="danger">
            {" "}
            <CaretRightOutlined /> Play
          </Button>
        </div>
      </div>
        <div className="md:hidden h-10 text-white px-5 flex justify-between items-center bg-blue-300">
          <p  onClick={() => {
              navigate(-1);
            }}
            className="m-0 hover:opacity-100 hover:text-yellow-300 cursor-pointer">
            {"< Back"}
          </p>
          <div className="w-40">
          <Progress
            trailColor={"rgba(66,87,178,.3)"}
            strokeColor={"#33FF00"}
            percent={processCard*100/(cards.length)}
            showInfo={false}
          />
          </div>
          <div>
            {`${processCard}/${cards.length}`}
          </div>
        </div>
      <CarouselCard setHeight={sizeOfCarousel}/>
      <div className="md:hidden flex justify-center">
      <Button onClick={() => {
            dispatch({type: "SUFFLE_CARDS"})
          }} className="mr-5">
            {" "}
            <SwapOutlined /> Suffle
          </Button>
          <Button  type="danger">
            {" "}
            <CaretRightOutlined /> Play
          </Button>
      </div>
    </div>
  );
}
