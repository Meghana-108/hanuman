import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login'
import SignUp from './components/SignUp'
import BuyerHome from "./components/BuyerHome";
import FishermenLogin from "./components/FishermenLogin";
import FisherHome from "./components/FisherHome";
import Option from "./components/Option";
import FishDetails from "./components/FishDetails";
import FisherDashboard from "./components/FisherDashboard";
import BuyerDashboard from "./components/BuyerDashboard";
import AvailableFishes from "./components/AvailableFishes";
import PriceAnalytics from "./components/PriceAnalytics";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/buyerhome" element={<BuyerHome/>}/>
        <Route path="/fisherlogin" element={<FishermenLogin/>}/>
        <Route path="/fisherhome" element={<FisherHome/>}/>
        <Route path="/option" element={<Option/>}/>
        <Route path="/FishDetails" element={<FishDetails/>}/>
        <Route path="/dashboard" element={<FisherDashboard/>}/>
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
       <Route path="/price-analytics" element={<PriceAnalytics />} />
<Route path="/price-analytics" element={<PriceAnalytics />} />

      </Routes>
    </Router>
  );
};

export default App;

