
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/HomePage'
import Signup from './components/Signup'
import Logo from './components/Logo'
import Sidebar from './components/Sidebar';
import EventRegistration from './components/user/EventRegistration';
import ViewRegistration from './components/admin/ViewRegistration';
import RegistrationDetail from './components/admin/RegistrationDetail';
import Booth from './components/admin/Booth';


function App() {


  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/sidebar" element={<Sidebar/>} />
        <Route path="/logo" element={<Logo/>} />
        <Route path="/eventRegistration" element={<EventRegistration/>} />
        <Route path="/viewRegistration" element={<ViewRegistration/>}/>
        <Route path="/registrationDetail" element={<RegistrationDetail/>} />
        <Route path="/booth" element={<Booth/>} />

      </Routes>
    </Router>
  );
}

export default App
