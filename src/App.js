import React from 'react';
import LoginPage from './screens/Login/Login';
import SignPage from './screens/Sign/Sign';
import IdeasPage from './screens/Ideas/Ideas';
import Homepage from './screens/Homepage/Homepage';
import ProfilePage from './screens/Profile/Profile';
import RecoverPage from './screens/Recover/Recover';
import IdeaView from './screens/IdeaView/ideaView';
import { HashRouter, Routes, Route } from 'react-router-dom';
import "./App.css"

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/banco-de-ideias-certificadora-3/" index element={<Homepage />} />
        <Route path="/banco-de-ideias-certificadora-3/SignPage" element={<SignPage />} />
        <Route path="/banco-de-ideias-certificadora-3/LoginPage" element={<LoginPage />} />
        <Route path="/banco-de-ideias-certificadora-3/RecoverPage" element={<RecoverPage />} />
        <Route path="/banco-de-ideias-certificadora-3/IdeasPage" element={<IdeasPage />} />
        <Route path="/banco-de-ideias-certificadora-3/ProfilePage" element={<ProfilePage />} />
        <Route path="/banco-de-ideias-certificadora-3/IdeaView" element={<IdeaView />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </HashRouter>
  )
}

export default App