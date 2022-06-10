import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetDeskById } from "../Redux/Actions/DeskAction";

export default function ListCard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deskDetail, cards } = useSelector((state) => state.DesksReducer);

  let params = useParams();
  let hashId = params.deskId;
  hashId -= 18082003;

  useEffect(() => {
    dispatch(GetDeskById(hashId));
  }, []);

  const contentCards = cards.map((item, index) => {
    return (
      <div
        key={index}
        className="grid grid-cols-5 md:gap-5 gap-2 mb-5 bg-white p-5 rounded-md shadow-md"
      >
        <div className="col-span-5 border-b flex justify-between opacity-50">
          <p className="m-0">{index + 1}</p>
        </div>
        <div className="col-span-2 md:pr-5 pr-2 border-r">
          {item.frontContent.split("\n").map((str,strIndex) => {
            return <p key={strIndex}>{str}</p>
          })}
        </div>
        <div className="col-span-2">
        {item.backContent.split("\n").map((str,strIndex) => {
            return <p className="m-0" key={strIndex}>{str}</p>
          })}
        </div>
        <div
          className="col-span-1 md:w-20  w-full md:h-20 h-14 border rounded-sm"
          style={{
            backgroundImage: `url(${item.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
        </div>
      </div>
    );
  });
  return <div className="relative z-10 md:container md:mx-auto md:w-3/4 mx-5 py-5">
      <div className="mb-5 border-b-2">
        <p
          className="text-blue-500 cursor-pointer w-12 mb-2 hover:text-blue-400"
          onClick={() => {
            navigate(-1);
          }}
        >{`< Back`}</p>
        <h1 className="text-3xl font-bold">{deskDetail.name}</h1>
      </div>

      {/* card  */}
      {contentCards}
  </div>;
}
