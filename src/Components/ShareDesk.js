import { Button } from 'antd';
import React from 'react'
import {  Typography } from 'antd';
import { useParams, useNavigate } from "react-router-dom";

const { Paragraph } = Typography;

export default function ShareDesk(props) {
  return (
    <div>
        <p className='font-bold'>Copy this link and send it for other people:</p>
        <Paragraph className='border p-2 text-lg' copyable>{`http://localhost:3000/detaildesk/${props.hashId}`}</Paragraph>
    </div>
  )
}
