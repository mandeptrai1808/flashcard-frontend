import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FacebookOutlined,GithubOutlined, YoutubeOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

export default function About() {
  const navigate = useNavigate();

  return (
  <div className='relative w-full h-screen' >
    <div className='h-full w-full bg-slate-200 absolute top-0 left-0'>
        <div className='h-96 w-full bg-slate-500' style={{
          backgroundImage: `url(https://wallpapercave.com/wp/wp6214950.jpg)`,
          backgroundPosition: 'center',
          backgroundSize: "cover"
        }}>

        </div>
    </div>
    <div className='w-full p-5 absolute top-0 left-0 pt-36 flex justify-center'>
      <div className='md:w-2/3 pt-28 pb-10 w-full bg-white rounded-xl shadow-xl'>
        <div className='text-center'>
          <p className='md:text-3xl text-2xl font-bold m-0'>Nguyen Van Man</p>
          <p className='mb-1 opacity-50'>vanman12315@gmail.com</p>
          <p className='md:text-lg opacity-50'>Web developer</p>
        </div>
        <div className='px-10 text-justify md:text-xl'>
          <p>Xin chào, ờm thì đây là một cái project tôi viết tên là FLASHCARD. Với cái App này thì tôi đã clone từ website Quizlet.com. Bạn có thể tạo mấy cái bộ thẻ học từng vựng hay thuật ngữ các kiểu. Đi like dạo, còm dạo bộ thẻ của người khác. Share bộ thẻ cho bạn bè. Đua top like nữa, nói chung nhiều tính năng lắm nên cứ khám phá ha. Thì ờm, hi vọng bạn sẽ hài lòng với cái của nợ này. Và tất nhiên rồi, nếu có vấn đề gì cần trao đổi thì liên lạc với tôi qua các kênh bên dưới. See Yaaaa PEACE!  </p>
          <div className="text-center md:text-3xl text-2xl mt-5 flex justify-center items-center">
          <a target="_blank" href='https://www.facebook.com/vanmancoder/'><FacebookOutlined className='mr-5 hover:scale-150 duration-200 cursor-pointer '/></a>
          <a target="_blank" href='https://github.com/mandeptrai1808'><GithubOutlined className='mr-5 hover:scale-150 duration-200 cursor-pointer '/></a>
          <a target="_blank" href='https://www.youtube.com/channel/UChQQrKebGv_3Cy31KzEjDpg'><YoutubeOutlined className='mr-5 hover:scale-150 duration-200 cursor-pointer '/></a>
          </div>
        </div>
      </div>
    </div>
    <div className='w-full absolute top-0 left-0 pt-12 flex justify-center'>
      <div className='w-48 h-48 rounded-full relative shadow-2xl' style={{
          backgroundImage: `url(http://pm1.narvii.com/7238/5cd20da37e6286a78c8cc7fac329853c6c5d2cabr1-266-266v2_00.jpg)`,
          backgroundPosition: 'center',
          backgroundSize: "cover"
        }}  >
      </div>
    </div>
 
    <div className='py-5 md:px-20 px-5'>
    <div className='relative z-20 flex justify-between'>
      <div onClick={() => {
        navigate('/')
      }} className='text-white duration-200 w-10 h-10 rounded-full hover:bg-opacity-50 hover:bg-white hover:text-black flex justify-center items-center border-2'><HomeOutlined/></div>
      <div className='text-white text-2xl'>
       <FacebookOutlined className='mx-2'/>
       <GithubOutlined className='mx-2'/>
      </div>
    </div>
    </div>
  </div>
  )
}
