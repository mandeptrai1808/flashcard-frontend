import React, { useEffect, useState } from "react";
import { Button, Input, Form, Typography, Popover, Skeleton } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import dateFormat, { masks } from "dateformat";
import {
  CreateNewComment,
  GetCommentsByDeskId,
} from "../Redux/Actions/CommentActions";
import { createNewNotification } from "../Redux/Actions/NotificationActions";
const { TextArea } = Input;

export default function CommentPlace(props) {
  let userData = localStorage.getItem("login_user");
  userData = userData && JSON.parse(userData);

  const dispatch = useDispatch();
  const { loadItem } = useSelector((state) => state.DesksReducer);
  const { listComment } = useSelector((state) => state.CommentReducer);
  const [loadMore, setLoadMore] = useState(4);
  //   console.log(listComment);

  const formComment = () => {
    if (userData)
      return (
        <div className="flex justify-around">
          <div
            style={{
              backgroundImage: `url(${userData.avatar})`,
              backgroundSize: "cover",
              backgrounPosition: "center",
            }}
            className="w-10 h-10  rounded-full"
          ></div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={(value) => {
              dispatch({ type: "IS_LOADING" });
              dispatch(createNewNotification({
                content: ` has comment in your ${props.deskDetail.name} desk`,
                username: userData.name,
                avatar: userData.avatar,
                userId: props.deskDetail.userId
              }))
              dispatch(
                CreateNewComment(
                  {
                    username: userData.name,
                    avatar: userData.avatar,
                    content: value.content,
                    deskId: props.deskId,
                  },
                  props.deskId
                )
              );
            }}
            className="md:w-full w-4/5 flex items-center"
            style={{ paddingRight: 10, paddingLeft: 5 }}
          >
            <Form.Item 
            rules={[
            { required: true, message: "Please type comment!" },
          ]} name="content" className="w-full">
              <TextArea
                autoSize
                style={{
                  borderRadius: 40,
                  paddingTop: 8,
                  paddingLeft: 20,
                }}
                placeholder="Comment here!"
              ></TextArea>
            </Form.Item>
            <Form.Item>
              <button
                htmlType="submit"
                className="w-10 h-10 rounded-full hover:bg-blue-800 cursor-pointer text-white text-xl flex justify-center items-center bg-blue-400"
              >
                <SendOutlined />
              </button>
            </Form.Item>
          </Form>
        </div>
      );
    else return;
  };

  const contentComments = listComment.map((item, index) => {
    if (index < loadMore)
      return (
        <div className="bg-white rounded-xl shadow-md w-full mb-5 px-5 py-2">
          <div className="flex border-b pb-2 justify-between items-center">
            <div className="flex items-center">
              <div
                style={{
                  backgroundImage: `url(${item.avatar})`,
                  backgroundSize: "cover",
                  backgrounPosition: "center",
                }}
                className="w-10 h-10 mr-5 rounded-full"
              ></div>
              <p className="m-0 text-md font-bold">{item.username}</p>
            </div>
          </div>
          <p>
            {item.content?.split("\n").map((str) => {
              return <p>{str}</p>;
            })}
          </p>
          <div className="text-right opacity-50">
            {dateFormat(item.createdAt, "dd/mm/yyyy, h:MM:ss TT")}
          </div>
        </div>
      );
  });
  useEffect(() => {
    dispatch({ type: "IS_LOADING" });
    dispatch(GetCommentsByDeskId(props.deskId));
  }, []);

  let showComments;
  if (!loadItem) {
    if (listComment[0]) showComments = contentComments;
    else (showComments = <p>This desk don't have any comments :c</p>);
  } else showComments = <Skeleton active className="col-span-3" />;

  return (
    <div className="my-10 py-5 border-t-2 px-2">
        <p className="font-bold"> Comment:</p>
      <div>{formComment()}</div>
      <div>{showComments}</div>
      {listComment.length > loadMore && listComment[0] ? (
        <p
          className="cursor-pointer text-center text-blue-600 hover:text-blue-500"
          onClick={() => {
            setLoadMore(loadMore + 5);
          }}
        >
          More...
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
