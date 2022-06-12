import React from 'react'
import Footer from '../Components/Footer'
import MenuHeader from '../Components/MenuHeader'
import SubMenu from '../Components/SubMenu'

export default function HomeTemplate(props) {
  return (
    <div  className="relative">
        <div style={{backgroundColor: "#F6F7FB"}} className="h-screen fixed top-0 left-0 w-screen z-0"></div>
        <MenuHeader/>
        <SubMenu />
        {props.component}
        {/* <Footer/> */}
    </div>
  )
}
