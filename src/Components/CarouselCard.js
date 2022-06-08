import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetDeskById } from "../Redux/Actions/DeskAction";
import ReactCardFlip from "react-card-flip";
export default function CarouselCar() {
  const dispatch = useDispatch();
  const { deskDetail, cards } = useSelector((state) => state.DesksReducer);
  const [isFlipped, setIsFlipped] = useState(true);
  let params = useParams();
  let hashId = params.deskId;
  hashId -= 18082003;
  useEffect(() => {
    dispatch(GetDeskById(hashId));
  }, []);

  let carousel = React.createRef();
  const next = () => {
    carousel.next();
  };
  const previous = () => {
    carousel.prev();
  };

  const contentCards = cards.map((item, index) => {
    return (
      <div key={index}>
        <div
          onClick={() => {
            setIsFlipped(!isFlipped);
          }}
          className="w-full h-72 pt-5 bg-white text-center px-5"
        >
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div>
              {item.frontContent.split("\n").map((str, strIndex) => {
                return <p key={strIndex}>{str}</p>;
              })}
              <div
                className="col-span-6 w-40 h-40 md:mt-2 inline-block  border text-center pt-2"
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>

            <div>
              {item.backContent.split("\n").map((str, strIndex) => {
                return <p key={strIndex}>{str}</p>;
              })}
            </div>
          </ReactCardFlip>
        </div>
      </div>
    );
  });
  return (
    <div className="w-full">
      <Carousel className="h-full" ref={(node) => (carousel = node)}>
        {contentCards}
      </Carousel>
      <div className="w-full flex justify-center">
        <ArrowLeftOutlined
          className="mr-5 p-2 rounded-full hover:bg-slate-400"
          onClick={previous}
        />
        <ArrowRightOutlined
          className=" p-2 rounded-full hover:bg-slate-400"
          onClick={next}
        />
      </div>
    </div>
  );
}
