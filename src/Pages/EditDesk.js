import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteDesk, GetDeskById, UpdateDesk } from "../Redux/Actions/DeskAction";
import {
  LikeFilled,
  StarFilled,
  ShareAltOutlined,
  OrderedListOutlined,
  EditOutlined,
  DeleteOutlined,
  HighlightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Button, Input, Form, Typography, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CreateNewCard,
  DeleteCard,
  UpdateCard,
} from "../Redux/Actions/CardActions";
import { render } from "react-dom";
const { TextArea } = Input;
const { Paragraph } = Typography;

export default function EditDesk() {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { deskDetail, cards } = useSelector((state) => state.DesksReducer);

  //   console.log(cards);

  let params = useParams();
  let hashId = params.deskId;
  hashId -= 18082003;

  const [newCardData, setNewCardData] = useState({
    frontContent: "",
    backContent: "",
    imageUrl: "",
    deskId: hashId,
  });

  useEffect(() => {
    dispatch(GetDeskById(hashId));
  }, []);

  const contentPopImage = (cardIndex, itemId) => {
    return (
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={(value) => {
          // dispatch(CreateNewCard(newCardData, hashId));
          dispatch({
            type: "UPDATE_IMAGE",
            id: cardIndex,
            content: value.imageUrl,
          });
          dispatch(UpdateCard({ imageUrl: value.imageUrl }, itemId));
        }}
        autoComplete="off"
        // className="grid grid-cols-6 md:gap-5 gap-1"
      >
        <Form.Item
          className="col-span-6 w-60 flex align-middle"
          name="imageUrl"
          rules={[
            { required: true, message: "Please input front content!" },
            {
              pattern: /^https?:\/\/.+\/.+$/,
              message: "This is not image link!",
            },
          ]}
        >
          <Input name="imageUrl" placeholder="Paste link url of image here" />
        </Form.Item>
        <div className="col-span-1">
          <Button htmlType="submit" type="danger">
            Update
          </Button>
        </div>
      </Form>
    );
  };

  const contentCards = cards.map((item, index) => {
    return (
      <div
        key={index}
        className="grid grid-cols-5 md:gap-5 gap-2 mb-5 bg-white p-5 rounded-md shadow-md"
      >
        <div className="col-span-5 border-b flex justify-between opacity-50">
          <p className="m-0">{index + 1}</p>
          <DeleteOutlined
            onClick={() => {
              dispatch(DeleteCard(item.id, hashId));
            }}
            className="p-2 duration-200 cursor-pointer hover:bg-slate-400 rounded-full"
          />
        </div>
        <div className="col-span-2 md:pr-5 pr-2 border-r">
          <TextArea
            autoSize
            value={item.frontContent}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_FRONT_CARD",
                id: index,
                content: e.target.value,
              });
              dispatch(UpdateCard({ frontContent: e.target.value }, item.id));
            }}
          />
        </div>
        <div className="col-span-2">
          <TextArea
            autoSize
            value={item.backContent}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_BACK_CARD",
                id: index,
                content: e.target.value,
              });
              dispatch(UpdateCard({ backContent: e.target.value }, item.id));
            }}
          />
        </div>
        <div
          content={contentPopImage}
          className="col-span-1 md:w-20  w-full md:h-20 h-14 border rounded-sm"
          style={{
            backgroundImage: `url(${item.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Popover
            content={contentPopImage(index, item.id)}
            placement="topRight"
            trigger="click"
            className="border w-full h-full bg-slate-800 hover:bg-opacity-40 bg-opacity-10 cursor-pointer text-center md:pt-4 text-2xl  round-full text-white"
          >
            <div className=" w-full h-full  cursor-pointer text-center md:pt-4 text-2xl  round-full text-white">
              <EditOutlined />
            </div>
          </Popover>
        </div>
      </div>
    );
  });
  return (
    <div className="relative z-10 md:container md:mx-auto md:w-3/4 mx-5 py-5">
      <div className="mb-5 border-b-2">
        <p
          className="text-blue-500 cursor-pointer w-12 mb-2 hover:text-blue-400"
          onClick={() => {
            navigate(-1);
          }}
        >{`< Back`}</p>
       <div className="flex justify-between items-center">
       <Paragraph
          editable={{
            icon: <HighlightOutlined style={{color: "#737373"}}/>,
            tooltip: "click to edit name desk",
            onChange: (value) => {
              dispatch({
                type: "UPDATE_DESK",
                name: value
              })
              dispatch(UpdateDesk({name: value}, hashId))
            },
          }}
          className="text-3xl font-bold w-2/3"
        >
          {deskDetail.name}
        </Paragraph>
        <Button onClick={async () => {
          dispatch(DeleteDesk(hashId, userData.id));        
          navigate("/desks");
          window.location.reload()

        }} type="danger">Delete Desk</Button>
       </div>
      </div>

      {/* card  */}
      {contentCards}

      {/* add new card  */}
      <div className="border-t-4">
        <p className="font-bold">Add new card:</p>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={() => {
            dispatch(CreateNewCard(newCardData, hashId));
          }}
          autoComplete="off"
          className="grid grid-cols-6 md:gap-5 gap-1"
        >
          <Form.Item
            className=" col-span-3 flex align-middle"
            name="frontContent"
            label="Front:"
            rules={[{ required: true, message: "Please input front content!" }]}
          >
            <TextArea
              autoSize
              name="frontContent"
              placeholder="Type content front of card"
              onChange={(e) => {
                setNewCardData({
                  ...newCardData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            className=" col-span-3 flex align-middle"
            name="backContent"
            label="Back:"
            rules={[{ required: true, message: "Please input back content!" }]}
          >
            <TextArea
              autoSize
              name="backContent"
              placeholder="Type content back of card"
              type={"textarea"}
              onChange={(e) => {
                setNewCardData({
                  ...newCardData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            className="col-span-6 w-60 flex align-middle"
            name="imageUrl"
            label="Image:"
            rules={[
              // { required: true, message: "Please input front content!" },
              {
                pattern: /^https?:\/\/.+\/.+$/,
                message: "This is not image link!",
              },
            ]}
          >
            <Input
              name="imageUrl"
              placeholder="Paste link url of image here"
              type={"textarea"}
              onChange={(e) => {
                setNewCardData({
                  ...newCardData,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </Form.Item>
          <div
            className="col-span-6 w-40 h-40 md:mt-2  border text-center pt-2"
            style={{
              backgroundImage: `url(${newCardData.imageUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {newCardData.imageUrl.match(/^https?:\/\/.+\/.+$/)
              ? ""
              : "No image"}
          </div>
          <div className="col-span-1">
            <Button htmlType="submit" type="danger">
              Add
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
