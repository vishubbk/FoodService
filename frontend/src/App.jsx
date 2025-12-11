import React from "react";
import { HashRouter   as Router, Routes, Route } from 'react-router-dom';


import Home from "./pages/Home";
import Login from "./pages/usersFolder/Login";
import SignUp from "./pages/usersFolder/SignUp";
import FoodPartnerLogin from "./pages/foodPartnerFolder/FoodPartnerLogin";
import FoodPartnerSignUp from "./pages/foodPartnerFolder/FoodPartnerSignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/foodPartner/signup" element={<FoodPartnerSignUp />} />
        <Route path="/foodPartner/login" element={<FoodPartnerLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
