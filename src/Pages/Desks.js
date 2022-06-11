import React, { useEffect, useState } from "react";
import { Tabs, Typography, Popover, Form, Button, Input } from "antd";
import {
  LikeFilled,
  StarFilled,
  LockOutlined,
  GlobalOutlined,
  HighlightOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  GetDesksByUserId,
  GetHistoryDesksByUserId,
  GetLikedDesksByUserId,
} from "../Redux/Actions/DeskAction";
import { useNavigate } from "react-router-dom";
import CreateDeskBtn from "../Components/CreateDeskBtn";
import { UpdateUser } from "../Redux/Actions/UserActions";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

export default function Desks() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { myDesks } = useSelector((state) => state.DesksReducer);
  const { isLogin } = useSelector((state) => state.LoginReducer);

  const [avatarUpdate, setAvatarUpdate] = useState("");

  const contentMyDesks = myDesks.map((item, index) => {
    let starScore = 0;
    if (item.rates) {
      item.rates.map((item) => (starScore += item.star));
      if (item.rates.length > 0)
        starScore = (starScore / item.rates.length).toFixed();
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

  useEffect(() => {
    dispatch(GetDesksByUserId(userData.id));
  }, []);

  const contentUpdateAvtater = (
    <div>
      <p>Use link url image to update your avatar!</p>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(value) => {
          // dispatch(CreateNewCard(newCardData, hashId));
          dispatch(UpdateUser({ avatar: avatarUpdate }, userData.id));
        }}
        autoComplete="off"
        // className="grid grid-cols-6 md:gap-5 gap-1"
      >
        <Form.Item
          className="col-span-6 w-60 flex align-middle"
          name="imageUrl"
          rules={[
            { required: true, message: "Please input link image!" },
            {
              pattern: /^https?:\/\/.+\/.+$/,
              message: "This is not image link!",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setAvatarUpdate(e.target.value);
            }}
            name="imageUrl"
            placeholder="Paste link url of image here"
          />
        </Form.Item>
        <div
          className="col-span-6 w-20 h-20 md:mt-2 mb-2 border text-center pt-2"
          style={{
            backgroundImage: `url(${
              avatarUpdate ? avatarUpdate : userData.avatar
            })`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* {user.imageUrl.match(/^https?:\/\/.+\/.+$/)
              ? ""
              : "No image"} */}
        </div>
        <div className="col-span-1">
          <Button htmlType="submit" type="danger">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );

  return (
    <div className="relative z-10 md:container md:mx-auto md:w-3/4 mx-5 py-5">
      <CreateDeskBtn />
      <div className="flex">
        <div
          className="rounded-full border-2 w-16 h-16 mr-5  flex justify-center  text-xl overflow-hidden"
          style={{
            backgroundImage: `url(${userData.avatar})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Popover
            content={contentUpdateAvtater}
            trigger={"click"}
            placement="rightBottom"
            className="w-full h-full pt-4 flex justify-center items-center hover:opacity-100 bg-opacity-50 opacity-0 bg-slate-500"
          >
            <EditOutlined style={{ color: "white" }} className="text-2xl" />
          </Popover>
        </div>
        <div>
          <Paragraph
            editable={{
              icon: <HighlightOutlined style={{ color: "#737373" }} />,
              tooltip: "click to edit name desk",
              onChange: (value) => {
                dispatch(UpdateUser({ name: value }, userData.id));
              },
            }}
            style={{ marginBottom: "0" }}
            className="mb-0 mt-1 text-2xl font-bold"
          >
            {userData.name}
          </Paragraph>
          <p className="opacity-70">{userData.email}</p>
        </div>
      </div>

      <div>
        <Tabs
          defaultActiveKey="1"
          onChange={(value) => {
            console.log(value);
            if (value == 1) dispatch(GetDesksByUserId(userData.id));
            if (value == 2) dispatch(GetLikedDesksByUserId(userData.id));
            if (value == 3) dispatch(GetHistoryDesksByUserId(userData.id));
          }}
        >
          <TabPane tab="Your desks" key="1">
            {contentMyDesks}
            {myDesks.length === 0 ? <p>You don't have any desks!</p> : ""}
          </TabPane>
          <TabPane tab="Liked desks" key="2">
            {contentMyDesks}
          </TabPane>
          <TabPane tab="History" key="3">
            {contentMyDesks}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
