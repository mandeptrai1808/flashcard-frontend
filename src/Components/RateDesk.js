import React, {useState} from 'react'
import {
    StarFilled,
    StarOutlined
  } from "@ant-design/icons";
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { UserRateDesk, UserUpdateRateDesk } from '../Redux/Actions/DeskAction';
export default function RateDesk(props) {

    const dispatch = useDispatch();

    const [starScore, setStarScore] = useState(props.data.star ? props.data.star : 0);
    const star = [0,0,0,0,0];


    const sendBtn = () => {
      if (props.mode === "RATE"){
        dispatch({
            type: "RATE_DESK",
            id: props.data.userId,
            star: starScore
        })
        dispatch(UserRateDesk({
            userId: props.data.userId,
            deskId: props.data.deskId,
            star: starScore
        }))
        dispatch({
            type: "CLOSE_MODAL"
        })
      }
      else if (props.mode === "UPDATE"){
        dispatch({
            type: "UPDATE_RATE",
            id: props.data.userId,
            star: starScore
        })
        dispatch(UserUpdateRateDesk({
            userId: props.data.userId,
            deskId: props.data.deskId,
            star: starScore
        }))
        dispatch({
            type: "CLOSE_MODAL"
        })
      }
    }
  return (
    <div>
        <p>Choose number star for this desk:</p>
       <div className='text-3xl text-center'>
       {star.map((item, index) => {
          if (index + 1 <= starScore) 
          return <StarFilled key={index} onClick={() => {
            setStarScore(index+1);
          }} style={{color: "yellowgreen"}} />
          else return <StarOutlined key={index} onClick={() => {
            setStarScore(index+1);
          }}/>
        })}
       </div>
       <Button onClick={sendBtn} className='w-full mt-10' type='danger'>SEND</Button>
    </div>
  )
}
