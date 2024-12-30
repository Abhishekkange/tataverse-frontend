import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js"; // Import Keycloak library
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const SignupWithKeycloak = () => {
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Keycloak instance
  const keycloak = new Keycloak({
    url: "https://lemur-3.cloud-iam.com/auth", // Keycloak base URL
    realm: "abc", // Your Keycloak realm
    clientId: "abhishek-kange", // Your Keycloak client ID
  });

  // Initialize Keycloak
  useEffect(() => {
    keycloak
      .init({ onLoad: "login-required" }) // Forces login if not already authenticated
      .then((authenticated) => {
        if (authenticated) {
          console.log("Authenticated successfully");
          handleLoginSuccess(keycloak.token);
        } else {
          console.warn("Authentication failed");
        }
      })
      .catch((error) => {
        console.error("Keycloak initialization error:", error);
      });
  }, []);

  const handleLoginSuccess = async (token) => {
    console.log("User Token:", token);

    try {
      // Decode the token to extract user information
      const decoded = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded Token:", decoded);

      const userName = decoded.name;
      const id = uuidv4();

      setId(id);
      setUserName(userName);

      const form = {
        id: id,
        username: decoded.name,
        email: decoded.email,
        token: token,
        isLogin: true,
        updatedAt: Date.now(),
      };

      // Send the data to the backend API
      const response = await axios.post("https://api.runtimetheory.com/api/saveUser", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("API response:", response.data);

      // Navigate to the Branding page after successful login
      navigate("/branding", { state: { id, userName } });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div
      style={{
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
      <div
        style={{
          textAlign: "center",
          borderRadius: "15px",
          padding: "40px",
          background: "rgba(0, 0, 0, 0.6)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>Welcome to VR</h2>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Sign in using Keycloak to explore
        </p>
        <button
          onClick={() => keycloak.login()} // Trigger Keycloak login
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            padding: "12px",
            textTransform: "uppercase",
            borderRadius: "30px",
            background: "#4caf50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
        >
          Sign in with Keycloak
        </button>
      </div>
    </div>
  );
};

export default SignupWithKeycloak;
