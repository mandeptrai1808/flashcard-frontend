import React from 'react'
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Login from './Login';
import { SignUpUser } from '../Redux/Actions/UserActions';
export default function SignUp() {
  const dispatch = useDispatch();
  const finishForm = (value) => {
    // dispatch(RegisterUser(value))
    dispatch(SignUpUser(value));
    dispatch({type: "IS_LOADING_BTN"})

  }
  const {isLoading} = useSelector(state => state.LoginReducer);
  
  return (
    <div>
        <h1 className='text-3xl text-red'>SIGN UP</h1>
          <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={finishForm}
        >
            <Form.Item
            name="name"
            rules={[{ required: true,
                message: "Please input your username!"}]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true,
                type: "email",
                message: "The input is not valid E-mail!"}]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true,
                message: "Please input your phone number!"}]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone"
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
            <Button
              loading={isLoading}
              type="danger"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
            <span className='mx-2'>Or</span>
            <span onClick={()=>{
        dispatch({
          type: "OPEN_DRAWER", 
          content: <Login/>,
          placement: "right"
        })
      }} className="text-blue-500 hover:text-blue-400 cursor-pointer" >
            Login now!
          </span>
         
          
        </Form.Item>
        </Form>
    </div>
  )
}
