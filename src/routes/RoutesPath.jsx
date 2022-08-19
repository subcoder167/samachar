import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet
  } from "react-router-dom";
import '../App.css'
import Login from '../components/login/Login';
import Register from '../components/login/Register';
import AntTable from '../components/antTable/AntTable';
import Empanelments from '../components/empanelments/Empanelments';
import MetaExpert from '../components/metaExpert/MetaExpert';
import MetaExpertProfile from '../components/metaExpert/MetaExpertProfile';
import Nav from '../components/Nav/Nav';
import Main from '../pages/Main';
import DemoForm from '../pages/DemoForm'
import MetaExpertProfileEdit from '../components/metaExpert/MetaExpertProfileEdit';
import Profile from '../components/Profile/Profile';
import UploadForm from '../components/uploadForm/UploadForm';
const RoutesPath = () => {
  return (
     <>
    <Routes>
      <Route path='' element={<Login/>}/>
      <Route path='Login' element={<Login/>}/>
      <Route path='Register' element={<Register/>}/>
        <Route path="dashboard" element={<Main/>}>
            <Route path="" element={<UploadForm/>}/>
            <Route path="upload" element={<UploadForm/>}/>
            {/* <Route path="experts" element={<AntTable/>}/>
            <Route path="clients" />
            <Route path="customers" />
            <Route path="projects" />
            <Route path="calls" />
            <Route path="leads" />
            <Route path="edits" />
            <Route path="agendas" />
            <Route path="questions" />
            <Route path="empanelments"element={<Empanelments/>} /> */}
            <Route path="profile" element={<Profile/>} />
        </Route>
      </Routes>

     </>
  )
}

export default RoutesPath