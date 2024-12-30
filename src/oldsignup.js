import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Signup = () => {
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginSuccess = async (credentialResponse) => {
    console.log("Login Success:", credentialResponse);
    const token = credentialResponse.credential;
    console.log("User Token:", token);

    const decoded = jwtDecode(token);
    console.log("decoded", decoded);

    const userName = decoded.name;
    try {
      const id = uuidv4();
      setId(id);
      setUserName(decoded.name);

      const form = {
        id: id,
        username: decoded.name,
        email: decoded.email,
        token: token,
        isLogin: true,
        updatedAt: Date.now(),
      };

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

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId="535912570456-3c93tuccirv1ovmfsc628teghs9g8amc.apps.googleusercontent.com">
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
          <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>Welcome to VR</h2>
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>Sign in to explore</p>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            text="signin_with"
            shape="pill"
            theme="outline"
            width="250px"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              padding: "12px",
              textTransform: "uppercase",
              borderRadius: "30px",
              transition: "all 0.3s ease-in-out",
            }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
