import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/usersFolder/Login";
import SignUp from "./pages/usersFolder/SignUp";
import FoodPartnerLogin from "./pages/foodPartnerFolder/FoodPartnerLogin";
import FoodPartnerSignUp from "./pages/foodPartnerFolder/FoodPartnerSignUp";
import PartnerDetails from "./pages/usersFolder/PartnerDetails";
import FoodPartnerAddReel from "./pages/foodPartnerFolder/FoodPartnerAddReel";
import { AppContext } from "./context/Context";

const App = () => {
  const [isDark, setIsDark] = useState(false); // GLOBAL STATE

  return (
    <Router>
      <AppContext.Provider value={{ isDark, setIsDark }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/partner/details/:id" element={<PartnerDetails />} />
          <Route path="/foodPartner/signup" element={<FoodPartnerSignUp />} />
          <Route path="/foodPartner/login" element={<FoodPartnerLogin />} />
          <Route path="/foodPartner/addReel" element={<FoodPartnerAddReel />} />
        </Routes>
      </AppContext.Provider>
    </Router>
  );
};

export default App;
