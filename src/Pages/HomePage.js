import React from "react";
import { LikeFilled, StarFilled } from "@ant-design/icons";

export default function HomePage() {
  return (
    <div className="p-5 relative z-10">
      <p className="font-bold">Gần đây:</p>
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="md:col-span-1 col-span-3 duration-100 w-full h-500 relative cursor-pointer hover:bg-slate-100 bg-white shadow-md rounded-sm p-5">
          <p className="m-0 font-bold text-xl">Name of desk</p>
          <p className="mb-10 opacity-50">Number cards</p>
          <div  className="flex align-middle absolute bottom-0 left-5">
            <img
              src="https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg"
              alt="avt"
              className="rounded-full w-5 h-5 mr-2"
            />
            <p>Nameuser</p>
          </div>
        </div>
        <div className="md:col-span-1 col-span-3 duration-100 w-full h-500 relative cursor-pointer hover:bg-slate-100 bg-white shadow-md rounded-sm p-5">
          <p className="m-0 font-bold text-xl">Name of desk</p>
          <p className="mb-10 opacity-50">Number cards</p>
          <div  className="flex align-middle absolute bottom-0 left-5">
            <img
              src="https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg"
              alt="avt"
              className="rounded-full w-5 h-5 mr-2"
            />
            <p>Nameuser</p>
          </div>
        </div>
      </div>
      <p className="font-bold">Những desks tôts nhất:</p>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="md:col-span-1 col-span-3 duration-100 w-full h-500 relative cursor-pointer hover:bg-slate-100 bg-white shadow-md rounded-sm p-5">
          <p className="m-0 font-bold text-xl">Name of desk</p>
          <p className="mb-10 opacity-50">Number cards</p>
          <div  className="flex align-middle absolute bottom-0 left-5">
            <img
              src="https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg"
              alt="avt"
              className="rounded-full w-5 h-5 mr-2"
            />
            <p>Nameuser</p>
          </div>
        </div>
        <div className="md:col-span-1 col-span-3 duration-100 w-full h-500 relative cursor-pointer hover:bg-slate-100 bg-white shadow-md rounded-sm p-5">
          <p className="m-0 font-bold text-xl">Name of desk</p>
          <p className="mb-10 opacity-50">Number cards</p>
          <div  className="flex align-middle absolute bottom-0 left-5">
            <img
              src="https://i.pinimg.com/736x/59/18/d8/5918d8e9040516b65f93c75a9c5b8175.jpg"
              alt="avt"
              className="rounded-full w-5 h-5 mr-2"
            />
            <p>Nameuser</p>
          </div>
          <div className="flex absolute bottom-0 right-5">
            <p className="mr-2"><LikeFilled style={{color: "blueviolet"}}/> 69</p>
            <p><StarFilled style={{color: "yellowgreen"}}/> 9/10</p>
          </div>
        </div>
      </div>
    </div>
  );
}
