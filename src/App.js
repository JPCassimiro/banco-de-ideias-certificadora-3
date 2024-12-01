import React from 'react';
import LoginPage from './screens/Login/Login';
import SignPage from './screens/Sign/Sign';
import IdeasPage from './screens/Ideas/Ideas';
import Homepage from './screens/Homepage/Homepage';
import { ProfilePage } from './screens/Profile/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/banco-de-ideias-certificadora-3/" index element={<Homepage />} />
        <Route path="/banco-de-ideias-certificadora-3/SignPage" element={<SignPage />} />
        <Route path="/banco-de-ideias-certificadora-3/LoginPage" element={<LoginPage />} />
        <Route path="/banco-de-ideias-certificadora-3/IdeasPage" element={<IdeasPage />} />
        <Route path="/banco-de-ideias-certificadora-3/ProfilePage" element={<ProfilePage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App