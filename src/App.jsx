import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import SignUp from './components/SignUp'
import BuyerHome from "./components/BuyerHome";
import FishermenLogin from "./components/FishermenLogin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/buyerhome" element={<BuyerHome/>}/>
        <Route path="/fisherlogin" element={<FishermenLogin/>}/>
      </Routes>
    </Router>
  );
};

export default App;

