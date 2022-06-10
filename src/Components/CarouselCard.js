import React, { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetDeskById } from "../Redux/Actions/DeskAction";
import ReactCardFlip from "react-card-flip";
export default function CarouselCar(props) {
  const dispatch = useDispatch();
  const { deskDetail, cards, processCard } = useSelector(
    (state) => state.DesksReducer
  );
  const [isFlipped, setIsFlipped] = useState(true);
  let params = useParams();
  let hashId = params.deskId;
  hashId -= 18082003;
  useEffect(() => {
    dispatch(GetDeskById(hashId));
  }, []);

  let carousel = React.createRef();
  const next = () => {
    setIsFlipped(false);

    carousel.next();
  };
  const previous = () => {
    setIsFlipped(false);
    carousel.prev();
  };

  //Press space to flip the card
  useEffect(() => {
    let isFlippedLoc = isFlipped;
    const listener = (event) => {
      if (
        event.code === "Space" ||
        event.code === "ArrowDown" ||
        event.code === "ArrowUp"
      ) {
        isFlippedLoc = !isFlippedLoc;
        setIsFlipped(isFlippedLoc);
        // event.preventDefault();
      }
      if (event.code === "ArrowRight" || event.code === "ArrowLeft") 
      setIsFlipped(false);
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const contentCards = cards.map((item, index) => {
    return (
      <div key={index}>
        <div
          onKeyDown={(e) => {
            // if (e.key === 'Space')
            // setIsFlipped(!isFlipped);
            console.log("press");
          }}
          onClick={() => {
            setIsFlipped(!isFlipped);
          }}
          style={{ height: props.setHeight }}
          className="w-full pt-5  text-center px-5"
        >
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div
              style={{ overflowY: "scroll", height: props.setHeight - 30 }}
              className={`p-5 relative border rounded-sm shadow-sm flex justify-center bg-white`}
            >
              <div>
                <div
                  className={`${
                    item.imageUrl
                      ? ""
                      : "h-full flex justify-center items-center"
                  }`}
                >
                  <div>
                    {item.frontContent.split("\n").map((str, strIndex) => {
                      return <p className="text-xl" key={strIndex}>{str}</p>;
                    })}
                  </div>
                </div>
                <div
                  className={`col-span-6 w-40 h-40 md:mt-2  ${
                    item.imageUrl ? "inline-block" : "hidden"
                  }  text-center pt-2`}
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            </div>

            <div
              style={{ height: props.setHeight - 30 }}
              className="h-72 border rounded-sm shadow-sm flex justify-center items-center bg-white"
            >
              <div>
                {item.backContent.split("\n").map((str, strIndex) => {
                  return <p className="text-xl" key={strIndex}>{str}</p>;
                })}
              </div>
            </div>
          </ReactCardFlip>
        </div>
      </div>
    );
  });
  return (
    <div className="w-full">
      <Carousel
        afterChange={(currentSlide) => {
          dispatch({
            type: "SET_PROCESSCARD",
            content: currentSlide + 1
          })
        }}
        dots={{ className: "bg-black py-2 bg-opacity-10 rounded-md" }}
        className="h-full"
        ref={(node) => (carousel = node)}
      >
        {contentCards}
      </Carousel>
      <div className="w-full mt-5 flex justify-center">
        <ArrowLeftOutlined className="mr-5 p-2 rounded-full hover:bg-slate-400"
          onClick={() => {
            if (processCard > 1) {
              previous();     
            }
          }}/>
        <ArrowRightOutlined  className="mr-5 p-2 rounded-full hover:bg-slate-400"
          onClick={() => {

            if (processCard < cards.length) {
              next();
            }
          }}/>
         
      </div>
    </div>
  );
}
