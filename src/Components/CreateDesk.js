import React, {useState} from 'react'
import { LikeFilled, StarFilled, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select } from "antd";
import { useDispatch } from 'react-redux';
import { CreateDeskApi } from '../Redux/Actions/DeskAction';
const { Option } = Select;
export default function CreateDesk() {

    const dispatch = useDispatch();

    let userData = localStorage.getItem("login_user");
    userData = userData && JSON.parse(userData);

    const [dataNewDesk, setDataNewDesk] = useState({
        name: "",
        status: "PRIVATE",
        userId: userData.id
    })

  return (
    <div>
        <p className='font-bold'>Example:</p>
         <div className=" duration-100 w-full h-500 relative cursor-pointer hover:bg-slate-100 bg-white shadow-md rounded-sm p-5">
          <p className="m-0 font-bold text-xl">{dataNewDesk.name}</p>
          <p className="mb-10 opacity-50">0 cards</p>
          <div  className="flex align-middle absolute bottom-0 left-5">
            <img
              src={userData.avatar}
              alt="avt"
              className="rounded-full w-5 h-5 mr-2"
            />
            <p>{userData.name}</p>
          </div>
          <div className="flex absolute bottom-0 right-5">
            <p className="mr-2"><LikeFilled style={{color: "blueviolet"}}/> 69</p>
            <p><StarFilled style={{color: "yellowgreen"}}/> 9/10</p>
          </div>
          <div>
            <p className="mr-2 absolute top-5 right-5">{dataNewDesk.status === "PRIVATE" ? <LockOutlined/> : <GlobalOutlined />}</p>
          </div>
        </div>

        <div className='pt-5 mt-5 border-t'>
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        // onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please type name of desk!",
            },
          ]}
        >
          <Input value={dataNewDesk.name} onChange={(e) => {
            setDataNewDesk({
                ...dataNewDesk,
                name: e.target.value
            })
          }}
            // prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Name of desk"
          />
        </Form.Item>

        <Form.Item
            name={['address', 'province']}
            noStyle
            rules={[{ required: true, message: 'Province is required' }]}
          >
            <Select placeholder="Select status of desk" onChange={(value)=>{
                setDataNewDesk({
                    ...dataNewDesk,
                    status: value
                })
            }}>
              <Option value="PRIVATE"><LockOutlined/> PRIVATE</Option>
              <Option value="PUBLIC"><GlobalOutlined/> PUBLIC</Option>
            </Select>
          </Form.Item>
     
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button mt-2"
            onClick={()=>{
                dispatch(CreateDeskApi(dataNewDesk));
            }}
          >
            Create
          </Button>
        
        </Form.Item>
      </Form>
        </div>
    </div>
  )
}
