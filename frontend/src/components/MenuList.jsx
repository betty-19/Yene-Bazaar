import {React, useState } from 'react';
import {Menu} from 'antd';
import '../assets/Sidebar.css'
import {FireFilled} from '@ant-design/icons';
import Logo from './Logo.jsx'


import { AppstoreOutlined, HomeOutlined,AreaChartOutlined, PayCircleOutlined, SettingOutlined, BarsOutlined } from '@ant-design/icons'

function MenuList({darkTheme, setActiveContent, onMenuItemClick, setActiveEventRegistration, setShowDetail, setSelectedRow,setActiveBooth}) {

  const userRole = localStorage.getItem("userRole");

    
  return (
    <Menu 
    theme={darkTheme ? 'dark' : 'light'} 
    style={{marginTop: 0 ,color:"white"}}
    mode="inline" className='menu-bar'>


         <Logo/>
        <Menu.Item key="home" icon= {<HomeOutlined/>} 
        // style={{color:'gold'}} 
        onClick={onMenuItemClick}
        style={{marginTop: 0 ,color:"white"}}>
            Home
        </Menu.Item>

{userRole == 2 ? (
  <>  
    <Menu.Item 
        key="activity" 
        icon= {<AppstoreOutlined />} 
        onClick={() => {
          setActiveContent('viewRegistration') ; 
          setActiveBooth(null);
          setActiveEventRegistration(null);
           onMenuItemClick()}} 
           style={{marginTop: 0 ,color:"white"}}>
            Registered Events
        </Menu.Item>
         <Menu.Item key="payment" icon= {<PayCircleOutlined/>} onClick = {()=>{
          setActiveBooth('booth');
          setActiveEventRegistration(null);
          setActiveContent(null);
          setShowDetail(false); 
          setSelectedRow(null);
          onMenuItemClick();
        }}
        style={{marginTop: 0 ,color:"white"}}>
            booth
        </Menu.Item>
</>
):(
          <Menu.Item
  key="progress"
  icon={<AreaChartOutlined />}
  onClick={() => {
    setActiveEventRegistration('eventRegistration');
    setActiveContent(null);
    setShowDetail(false); 
    setSelectedRow(null);
    setActiveBooth(null);
    onMenuItemClick();
  }}
>
  Event Registration
</Menu.Item>
)}
    


        {/* <Menu.SubMenu key="tasks" icon={<BarsOutlined/>} title="Tasks">
         <Menu.Item key="task-1" onClick={onMenuItemClick}>Task 1</Menu.Item>
         <Menu.Item key="task-2" onClick={onMenuItemClick}>Task 2</Menu.Item>
         <Menu.SubMenu key="subtasks" title='Subtasks'>
            <Menu.Item key="subtask-1" onClick={onMenuItemClick}>Subtask 1</Menu.Item>
            <Menu.Item key="subtask-2" onClick={onMenuItemClick}>Subtask 2</Menu.Item>
         </Menu.SubMenu>
        </Menu.SubMenu> */}




     
        {/* <Menu.Item key="setting" icon= {<SettingOutlined/>} onClick={onMenuItemClick}>
            Setting
        </Menu.Item> */}
      {/* {viewRegistration && <ViewRegistration/>} */}


    </Menu>
  )
}

export default MenuList
