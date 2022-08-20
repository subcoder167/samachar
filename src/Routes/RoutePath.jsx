import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Register from '../components/Login/Register';
import Login from '../components/Login/Login';
import Home from '../components/Home';
import Layout from '../components/Layout';
import Editor from '../components/Editor';
import Admin from '../components/Admin';
import Missing from '../components/Missing';
import Unauthorized from '../components/Unauthorized';
import Lounge from '../components/Lounge';
import LinkPage from '../components/LinkPage';
import RequireAuth from '../components/RequireAuth';
import Main from '../pages/Main';
import Profile from '../components/Profile/Profile'
import UploadForm from '../components/uploadForm/UploadForm'
import { ROLES } from '../constants/RoleConstants';
const RoutePath = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}exact >
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.scout]} />}>
          <Route path="dashboard" element={<Main role={ROLES.scout} />}>
                {/* <Route path="" element={<UploadForm />} /> */}
                <Route path="profile" element={<Profile/>} />
                <Route path="upload" element={<UploadForm/>} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.writer]} />}>
        <Route path="dashboard" element={<Main role={ROLES.writer} />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.reviewer]} />}>
        <Route path="dashboard" element={<Main role={ROLES.reviewr} />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default RoutePath