import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetDeskById,
  PushHistories,
  UserLikeDesk,
  UserUnlikeDesk,
} from "../Redux/Actions/DeskAction";
import {
  LikeFilled,
  StarFilled,
  ShareAltOutlined,
  OrderedListOutlined,
  EditOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import CarouselCard from "../Components/CarouselCard";
import ShareDesk from "../Components/ShareDesk";
import RateDesk from "../Components/RateDesk";

export default function DetailDesk() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);
  if (!userData) userData = {};
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { deskDetail, cards } = useSelector((state) => state.DesksReducer);

  let rateSroceAvg = 0;
  if (deskDetail) deskDetail.rates?.map((item) => (rateSroceAvg += item.star));
  if (deskDetail.rates?.length)
    rateSroceAvg = (rateSroceAvg / deskDetail.rates?.length).toFixed();

  let params = useParams();
  let hashId = params.deskId;
  hashId -= 18082003;
  useEffect(() => {
    dispatch(GetDeskById(hashId));
    dispatch(PushHistories({userId: userData.id, deskId: hashId}))
  }, []);

  const unLikeFunc = (userId) => {
    if (userId) {
      dispatch({
        type: "UNLIKE_DESK",
        id: userId,
      });
      dispatch(
        UserUnlikeDesk({
          userId: userId,
          deskId: deskDetail.id,
        })
      );
    }
  };

  const likeFunc = (userId) => {
    if (userId) {
      dispatch({
        type: "LIKE_DESK",
        id: userId,
      });
      dispatch(
        UserLikeDesk({
          userId: userId,
          deskId: deskDetail.id,
        })
      );
    } else alert("Login to like this desk!");
  };

  let contentShowCard = (
    <div className="w-full h-96 flex justify-center items-center rounded-sm shadow-md border">
      {cards.length > 0 ? (
        <CarouselCard setHeight={300} />
      ) : (
        <div className="text-xl font-bold text-center">
          <p>This desk don't have any cards!</p>
          <p>Click Edit to add more</p>
        </div>
      )}
    </div>
  );

  const star = [0, 0, 0, 0, 0];
  // const contentStar = () => {
  //   let content;
  //   for (let index = 1; index <= 5; index++) {
  //     content = "";
  //     if(index <= rateSroceAvg)
  //     content += <StarFilled  style={{color: "yellowgreen"}}/>
  //     else  content += <StarOutlined />
  //   }
  //   console.log(content)
  //   return content;
  // }

  return (
    <div className="relative z-10 md:container md:mx-auto md:w-3/4 mx-5 py-5">
      <div className="mb-5 pb-5 border-b-2">
        <div className="flex justify-between items-center">
          <h1 className="m-0 text-3xl font-bold">{deskDetail.name}</h1>
          <p className="opacity-50">Made by: {deskDetail.username}</p>
        </div>
        <p className="opacity-50">{`${cards.length} cards`}</p>
        <div className="md:text-lg">
          <span className="mr-5">
            {deskDetail.likes?.find((item) => item.userId === userData.id) ? (
              <LikeFilled
                onClick={() => {
                  unLikeFunc(userData.id);
                }}
                className="mr-1 cursor-pointer"
                style={{ color: "blueviolet" }}
              />
            ) : (
              <LikeFilled
                onClick={() => {
                  likeFunc(userData.id);
                }}
                className="mr-1 cursor-pointer"
                style={{ color: "#cccccc" }}
              />
            )}

            <span> {deskDetail.likes?.length}</span>
          </span>
          <span>
            {star.map((item, index) => {
              if (index + 1 <= rateSroceAvg)
                return (
                  <StarFilled key={index} style={{ color: "yellowgreen" }} />
                );
              else return <StarOutlined key={index} />;
            })}
            <span className="ml-1"> {rateSroceAvg}.0</span>
            <span className="ml-1">{`(${deskDetail.rates?.length} rates)`}</span>
            { deskDetail.rates?.find((item) => item.userId === userData.id) ? (
              <Button
              disabled={userData.id ? false : true}
                onClick={() => {
                  dispatch({
                    type: "OPEN_MODAL",
                    content: (
                      <RateDesk
                        data={{
                          userId: userData.id,
                          deskId: deskDetail.id,
                          star: deskDetail.rates?.find(
                            (item) => item.userId === userData.id
                          ).star,
                        }}
                        mode="UPDATE"
                      />
                    ),
                    title: "Update Rate",
                  });
                }}
                className="ml-1"
              >
                Change Vote
              </Button>
            ) : (
              <Button
              disabled={userData.id ? false : true}
                onClick={() => {
                  dispatch({
                    type: "OPEN_MODAL",
                    content: (
                      <RateDesk
                        data={{ userId: userData.id, deskId: deskDetail.id }}
                        mode="RATE"
                      />
                    ),
                    title: "Rate Desk",
                  });
                }}
                className="ml-1"
              >
                Vote
              </Button>
            )}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-10">
        <div className="col-span-3 md:block hidden md:w-32">
          <Button
            onClick={() => {
              navigate(`/learn/${18082003 + hashId}`);
            }}
            type="primary"
            className="md:w-32"
            disabled = {cards.length > 0 ? false:true}
          >
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
                content: <ShareDesk hashId={18082003 + hashId} />,
                title: "Create Desk",
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

        <div className="md:col-span-7 col-span-10 mb-5">{contentShowCard}</div>

        <div className="md:col-span-3 col-span-10 md:hidden flex justify-around md:w-32">
          <Button
            onClick={() => {
              navigate(`/learn/${18082003 + hashId}`);
            }}
            type="primary"
            className="md:w-32"
            disabled = {cards.length > 0 ? false:true}

          >
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
              console.log("click");
              dispatch({
                type: "OPEN_MODAL",
                content: <ShareDesk hashId={18082003 + hashId} />,
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
