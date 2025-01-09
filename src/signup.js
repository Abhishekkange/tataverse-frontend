import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useKeycloak } from './KeycloakContext'; // Importing the Keycloak context to use the Keycloak instance
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  
  // Access the Keycloak instance and authentication state from the context
  const { keycloakInstance, isAuthenticated } = useKeycloak();

  useEffect(() => {
    // Once Keycloak is initialized and authenticated, proceed with user data processing
    if (keycloakInstance && isAuthenticated) {
      const token = keycloakInstance.token;
      const decoded = keycloakInstance.tokenParsed;
      const userName = decoded.name;
      const id = uuidv4();
      setUserName(userName);
      setId(id);

      const form = {
        id: id,
        username: userName,
        email: decoded.email,
        token: token,
        isLogin: true,
        updatedAt: Date.now(),
      };

      // Send the data to your API
      axios
        .post("https://api.runtimetheory.com/api/saveUser", form, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("API response:", response.data);
          navigate("/branding", { state: { id, userName } }); // Navigate to branding page
        })
        .catch((error) => {
          console.error("Error saving user:", error);
        });
    }
  }, [keycloakInstance, isAuthenticated, navigate]);

  const handleLogin = () => {
    if (keycloakInstance) {
      keycloakInstance.login(); // Trigger Keycloak login
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `url(https://runtimetheory.s3.ap-south-1.amazonaws.com/6ba025fd-944e-417d-b552-c486e2ce9df3.jpg) no-repeat center center fixed`,
        backgroundSize: "cover",
        position: "relative",
        color: "#fff",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          borderRadius: "15px",
          padding: "40px",
          background: "rgba(0, 0, 0, 0.6)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          transform: "scale(1)",
          transition: "transform 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Welcome to VR
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Sign in to explore
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleLogin} // On button click, Keycloak login is triggered
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            padding: "12px",
            textTransform: "uppercase",
            borderRadius: "30px",
            width: "250px",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          }}
        >
          Sign In with Keycloak
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
