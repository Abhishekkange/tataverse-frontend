import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Use named import
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Import the required components
import { v4 as uuidv4 } from "uuid";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // Fetch the initial access token
      const requestData = {
        client_id: "abhishek",
        client_secret: "dSVuLepCsnskzRtzmmXE99PBYkNgapHP",
        grant_type: "password",
        username: email,
        password: password,
      };

      const response = await axios.post(
        "https://lemur-17.cloud-iam.com/auth/realms/tatatechnologies/protocol/openid-connect/token",
        new URLSearchParams(requestData),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const { access_token } = response.data;
      if (!access_token) {
        setError("Failed to obtain access token.");
        return;
      }

      let decodedToken;
      try {
        decodedToken = jwtDecode(access_token);
      } catch (err) {
        setError("Invalid token. Please try again.");
        return;
      }

      const userEmail = decodedToken.email;
      console.log("Extracted Email:", userEmail);

      // Fetch the second access token for admin operations
      const tokenResponse = await axios.post(
        "https://lemur-17.cloud-iam.com/auth/realms/tatatechnologies/protocol/openid-connect/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: "abhishek",
          client_secret: "dSVuLepCsnskzRtzmmXE99PBYkNgapHP",
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const accessToken2 = tokenResponse.data.access_token;
      console.log(accessToken2)
      if (!accessToken2) {
        setError("Failed to get admin access token.");
        return;
      }
      //done

      // Fetch user details using email
      const userResponse = await axios.get(
        `https://lemur-17.cloud-iam.com/auth/admin/realms/tatatechnologies/users?email=${userEmail}`,
        { headers: { Authorization: `Bearer ${accessToken2}` } }
      );

      const userData = userResponse.data[0];
      if (userData) {
        const { username, id } = userData;
        console.log("Username:", username);
        console.log("User ID:", id);

        navigate("/branding", { state: { id, userName: username } });
      } else {
        setError("User not found.");
      }
      console.log("userData", userData)
      console.log("api called")
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data?.error_description || "An error occurred while logging in.";
      setError(errorMessage);
    }
  };

  // Google Sign-In Handler
  const handleGoogleLogin = async (response) => {
    console.log("Google Login Response:", response);
    const token = response.credential;
    console.log("User Token:", token);

    const decoded = jwtDecode(token);
    console.log("decoded", decoded);

    const userName = decoded.name;
    const id = uuidv4();
    const form = {
      id: id,
      username: decoded.name,
      email: decoded.email,
    };

    const responsew = await axios.post("https://api.runtimetheory.com/api/saveUser", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/branding", { state: { id, userName } });




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
          <span>Technologies</span>
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
        <div style={{ flex: "1", padding: "20px", color: "#FFFFFF" }}>
          <img
            src="/plane-image.png"
            alt="Left Section Image"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>

        <div style={{ flex: "1", padding: "20px", color: "#FFFFFF" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: "bold",
                fontSize: "44px",
                color: "#75E0E4",
                marginBottom: "40px",
              }}
            >
              Welcome to TATA Techverse
            </h1>
            <h1 style={{ marginBottom: "10px" }}>Signin to get started</h1>
            <p>
              Don't have an account yet?{" "}
              <Link
                to="/signup"
                style={{ color: "#FFFFFF", textDecoration: "underline" }}
              >
                Sign up
              </Link>
            </p>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "50%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "5px",
                backgroundColor: "#2F0B33",
                color: "#FFFFFF",
                border: "1px solid #FFFFFF",
                fontSize: "16px",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "50%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "5px",
                backgroundColor: "#2F0B33",
                color: "#FFFFFF",
                border: "1px solid #FFFFFF",
                fontSize: "16px",
              }}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
              onClick={handleLogin}
              style={{
                width: "50%",
                padding: "12px",
                backgroundColor: "#75E0E4",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Signin
            </button>

            {/* Google SignIn Button */}
            <GoogleOAuthProvider clientId="535912570456-3c93tuccirv1ovmfsc628teghs9g8amc.apps.googleusercontent.com">
              <GoogleLogin 
                onSuccess={handleGoogleLogin}
                onError={(error) => console.log("Google Login Error:", error)}
                style={{
                  width: "50%",
                  padding: "12px",
                  backgroundColor: "#4285F4",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "15px",
                }}
              >
                Signin with Google
              </GoogleLogin>
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
