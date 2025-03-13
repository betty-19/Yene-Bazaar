import {React, useState} from 'react'
import {FireFilled} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// const [isSidebarVisible,setIsSidebarVisible] = useState(true);

// const handleLeftIcon = () =>{
//   setIsSidebarVisible(!isSidebarVisible)
// }
function Logo() {
  const username = localStorage.getItem("username");
  const nav = useNavigate();
   
  const handleLogout = ()=>{
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    nav("/")
  }
  return (
          <div className='logo' 
       // style={{backgroundColor:"#000"}}
       style={{fontSize:"20px",color:"gold"}}
       >
           <div className="icons"
           style={{display:"flex"}}
            >
               {/* <FireFilled className='logo-icon' /> */}
               <i class="bi bi-person-fill" ></i>
               <p style={{margin:"5px",fontSize:"20px"}}>{username}</p>
               
               {/* <i class="bi bi-arrow-left" onClick={handleLeftIcon}></i> */}
           </div>
           <i class="bi bi-box-arrow-left" style={{margin:"5px",fontSize:"25px",cursor:"pointer"}} onClick={handleLogout}></i>

           
         
       </div>
  )
}

export default Logo
