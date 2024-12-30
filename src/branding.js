import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Grid } from "@mui/material"; // Import Material UI components

const Branding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, userName } = location.state || {};

  const handleProceed = () => {
    navigate(`/landing?id=${id}&userName=${userName}`);
  };

  const handleManualUpload = () => {
    window.location.href = `https://runtimetheory.com/?id=${id}`;
  };

  const handleFileUpload = () => {
    // Navigate to the Landing Page and pass the id and userName as query parameters
    navigate(`/landing?id=${id}&userName=${userName}`);
  };

  const handleClock = () => {
    console.log("Clock button clicked");
    // Implement additional functionality for the clock button here
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          "url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjpuxXSDs6vA1s89l5HO0ADie98zuqgnmr7MYpOKEerHKyLQMZADri31yj43I_ju_6cmgbVHRIRvgP3dZyYxMxdS1DJ2W5Nt6trDhNVQIE6ZbUaUeYTB1ey1b7AR0SY3Z2p84uXg7RaGQuEKlCakfqp4R6ZkAZaQL_PcXJou2k4dOaRKV9-Vts0Sql1p0U/w660-h374/Leonardo_Phoenix_10_Create_a_futuristic_VR_image_with_a_glowin_3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontFamily: "'Roboto', sans-serif",
        position: "relative", // Required for positioning the top-right button
      }}
    >
      {/* Top-right Clock Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClock}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "10px 30px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          backgroundColor: "#1976d2", // Blue color similar to "Go to Tataverse"
          color: "#fff",
        }}
      >
        User Manual
      </Button>

      {/* Main Content */}
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "40px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "20px", fontWeight: "bold" }}>
          Welcome, {userName}!
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
          Welcome to Tataverse. What would you like to do?
        </p>

        {/* Responsive Grid Layout for buttons */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleManualUpload}
              style={{
                padding: "10px 30px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Go to Tataverse
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleFileUpload}
              style={{
                padding: "10px 30px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Upload Files
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Branding;
