import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./ksignup";
import Branding from "./branding";
import LandingPage from "./landingPage";
import SignIn from "./signin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/branding" element={<Branding />} />
        <Route path="/landing" element={<LandingPageWrapper />} />
        <Route path="/signin" element={<SignIn />} />

      </Routes>
    </Router>
  );
};

// Wrapper for LandingPage to pass props
const LandingPageWrapper = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const id = query.get("id");
  const userName = query.get("userName");

  return (
    <LandingPage id={id} userName={userName} navigate={navigate} />
  );
};

export default App;
