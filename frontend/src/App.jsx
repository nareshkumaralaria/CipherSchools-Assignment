import React, { useState } from 'react'
import { Home, Signin, Signup } from './components';
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

const getLocalStorageData = () => {
  let userLS = localStorage.getItem("user");
  if (userLS) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return null;
  }
}

function App() {

  const [user, setUser] = useState(getLocalStorageData);

  return (
    <>
      <Toaster toastOptions={{ style: { zIndex: "1056" }, }} />
      <Routes>
        <Route path="/" element={<Home getLocalStorageData={getLocalStorageData} user={user} setUser={setUser} />} />
        <Route path="/signup" element={
          user === null ? <Signup /> : <Navigate to="/" />
        } />
        <Route path="/signin" element={
          user === null ? <Signin /> : <Navigate to="/" />
        } />
      </Routes>
    </>
  )
}

export default App
