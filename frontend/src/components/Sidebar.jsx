import { useState } from 'react';
import { Layout, theme } from 'antd'; // Import theme here
import Logo from './Logo.jsx';
import '../assets/Sidebar.css';
import { MenuOutlined} from '@ant-design/icons';
import MenuList from './MenuList.jsx';
import ViewRegistration from './admin/ViewRegistration.jsx';
import EventRegistration from './user/EventRegistration.jsx'
import Detail from './admin/RegistrationDetail.jsx';
import Booth from '../components/admin/Booth.jsx'
import {FireFilled} from '@ant-design/icons';
import { baseUrl } from '../util/constants.jsx';

const {  Sider, Content } = Layout;

function Sidebar() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [darkTheme, setDarkTheme] = useState(true);
    
    const [activeContent, setActiveContent] = useState(null); // For dynamic content
   
    const [activeEventRegistration, setActiveEventRegistration] = useState(null);
    const [activeBooth,setActiveBooth] = useState(null);


    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    




    const toggleSidebar = () =>{
        setIsSidebarVisible(!isSidebarVisible);
    }
   
    const handleMenuItemClick = () =>{
        setIsSidebarVisible(false);
    }

    const handleViewDetail = (rowData) =>{
        setSelectedRow(rowData);
        setShowDetail(true);
     
        
    }
    const handleBackToViewRegistration = () => {
        setSelectedRow(null);
        setShowDetail(false);
       
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken(); 
    

    return (
        <Layout className='sideee'>

            


            <Sider
              
                className={`sidebar ${isSidebarVisible? 'visible' : '' }` }
                width={250}
                trigger={null}
            >
               
        
                <MenuList 
                     darkTheme={"darkTheme"}
                     onMenuItemClick={handleMenuItemClick}
                     setActiveContent={setActiveContent}
                     setActiveEventRegistration = {setActiveEventRegistration}
                     setActiveBooth = {setActiveBooth}
                     setShowDetail = {setShowDetail}
                      setSelectedRow = {setShowDetail}
                />
                    <div class="dropdown-menu" aria-labelledby="triggerId">
                    <a class="dropdown-item" href="#">Profile</a>
                    <a class="dropdown-item" href="#">Setting action</a>
                  </div>
             
               
            </Sider>
            <Layout>
                
                <Content
                    style={{
                        // background: colorBgContainer,
                    }}
                    className="content-area"
                >
                    <div className='menu-bar-icon' >
                  
                  <p className="menu-text">
                    <i style={{color:"#fff"}} className='bi bi-list menuu-icon' onClick={toggleSidebar}></i><span>YeneBazaar</span>
                </p>
                  
            </div>

                     {activeEventRegistration === 'eventRegistration' && (<EventRegistration/>)}
                     {activeBooth === 'booth' && (<Booth/>)}
                     {activeEventRegistration !== 'eventRegistration' && activeContent === 'viewRegistration' && !showDetail && (
    <ViewRegistration onViewDetail={handleViewDetail} />
  )}
                    {showDetail && <Detail onBack={handleBackToViewRegistration} rowData={selectedRow}/>}
                </Content>
            </Layout>
        </Layout>
    );
}

export default Sidebar;
