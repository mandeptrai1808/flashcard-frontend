import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { LoginUser } from "../Redux/Actions/UserActions";
import SignUp from "./SignUp";
export default function Login() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(LoginUser(values));
  };

  return (
    <div>
      <h1 className="border-b text-2xl">LOGIN</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <p className="text-blue-500 hover:text-blue-400 cursor-pointer">
            Forgot password
          </p>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or{" "}
          <span
            className="text-blue-500 hover:text-blue-400 cursor-pointer"
            onClick={() => {
              dispatch({
                type: "OPEN_DRAWER", 
                content: <SignUp/>,
                placement: "right"
              })
            }}
          >
            Register now!
          </span>
        </Form.Item>
      </Form>
    </div>
  );
}
