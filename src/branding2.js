import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Branding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, id } = location.state || {}; // Access state passed from Signin

  useEffect(() => {
    document.body.style.backgroundColor = "#2F0B33";
    document.body.style.margin = "0";
    document.body.style.color = "#FFFFFF";
    document.body.style.fontFamily = "Arial, sans-serif";
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.fontFamily = "";
    };
  }, []);

  // Function to handle "Enter TATA Techverse" button click
  const handleEnterClick = () => {
    window.location.href = `https://runtimetheory.com/?id=${id}`;
  };

  // Function to handle "Upload Media Files" button click
  const handleUploadClick = () => {
    navigate(`/landing?id=${id}&userName=${userName}`);
  };

  return (
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            fontFamily: "'Arial', sans-serif",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <span>TATA</span>
          <span>technologies</span>
        </div>
        <img
          src="your-logo-path.png"
          alt="Logo"
          style={{ width: "50px", height: "50px", cursor: "pointer" }}
        />
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          gap: "20px",
        }}
      >
        {/* Left Section */}
        <div style={{ flex: "1", padding: "20px", color: "#FFFFFF" }}>
          <p>Hi {userName}</p>
          <p>WELCOME TO TATA TECHVERSE</p>
          <p>How would you like to proceed?</p>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={handleEnterClick} // Add click event handler for Enter button
              style={{
                padding: "10px 20px",
                backgroundColor: "#5C1C8C",
                color: "#FFF",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Enter TATA Techverse
            </button>
            <button
              onClick={handleUploadClick} // Add click event handler for Upload button
              style={{
                padding: "10px 20px",
                backgroundColor: "#5C1C8C",
                color: "#FFF",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Upload Media Files
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div style={{ flex: "1", padding: "20px", color: "#FFFFFF" }}>
          <img
            src="/image.png" // Replace with your actual image path in the public folder
            alt="Right Section Image"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Branding;
