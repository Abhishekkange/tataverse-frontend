import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error message state

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

  // Check if all fields are filled
  const isFormValid = () => {
    return firstName && lastName && username && email && password;
  };

  // Handle sign-up button click
  const handleSignUp = async () => {
    // Clear previous error
    setError("");

    if (!isFormValid()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // First API Request to get the access token
      const tokenResponse = await axios.post(
        "https://lemur-17.cloud-iam.com/auth/realms/tatatechnologies/protocol/openid-connect/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: "abhishek",
          client_secret: "dSVuLepCsnskzRtzmmXE99PBYkNgapHP"
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;
      console.log("Access Token:", accessToken);
      if (!accessToken) {
        setError("Failed to get access token.");
        return;
      }

      // Second API Request to create the user
      const userResponse = await axios.post(
        "https://lemur-17.cloud-iam.com/auth/admin/realms/tatatechnologies/users",
        {
          username: username,
          email: email,
          enabled: true,
          firstName: firstName,
          lastName: lastName,
          credentials: [
            {
              type: "password",
              value: password,
              temporary: false
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (userResponse.status === 201) {
        // Redirect to the Sign In page after successful sign-up
        // You can use `history.push('/signin')` or navigate programmatically here.
        // For now, just log success
        navigate("/signin");
      } else {
        console.error('Error during sign-up:', userResponse.data);
        setError("Failed to sign up. Please try again.");
      }
    } catch (error) {
      // Check if the error has a response and log it
      if (error.response) {
        console.error('Error response data:', error.response.data);  // More details about the error
        console.error('Error response status:', error.response.status);  // Status code
        console.error('Error response headers:', error.response.headers);  // Headers
        // Ensure that only a string is stored in `error`
        setError(error.response.data?.errorMessage || "An error occurred during sign-up.");
      } else {
        console.error('Error message:', error.message);  // General error message
        setError(error.message || "An error occurred during sign-up.");
      }
    }
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
        <div style={{ display: "flex", gap: "10px", fontFamily: "'Arial', sans-serif", fontSize: "18px", fontWeight: "bold" }}>
          <span>TATA</span>
          <span>Technologies</span>
        </div>
        <img src="your-logo-path.png" alt="Logo" style={{ width: "50px", height: "50px", cursor: "pointer" }} />
      </header>

      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px", gap: "20px" }}>
        <div style={{ flex: "1", padding: "20px", color: "#FFFFFF" }}>
          <img
            src="/plane-image.png"
            alt="Left Section Image"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>

        <div style={{ flex: "1", padding: "20px", color: "#FFFFFF" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <h1 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: "bold", fontSize: "44px", color: "#75E0E4", marginBottom: "40px" }}>
              Sign Up
            </h1>
            <h1 style={{ marginBottom: "10px" }}>Sign up to get started</h1>
            <p>
              Already have an account?{" "}
              <Link to="/signin" style={{ color: "#FFFFFF", textDecoration: "underline" }}>
                Sign In
              </Link>
            </p>

            {/* Input Fields */}
            <div style={{ display: "flex", gap: "20px" }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ width: "48%", padding: "10px", marginBottom: "15px", borderRadius: "5px", backgroundColor: "#2F0B33", color: "#FFFFFF", border: "1px solid #FFFFFF", fontSize: "16px" }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ width: "48%", padding: "10px", marginBottom: "15px", borderRadius: "5px", backgroundColor: "#2F0B33", color: "#FFFFFF", border: "1px solid #FFFFFF", fontSize: "16px" }}
              />
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "48%", padding: "10px", marginBottom: "15px", borderRadius: "5px", backgroundColor: "#2F0B33", color: "#FFFFFF", border: "1px solid #FFFFFF", fontSize: "16px" }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "48%", padding: "10px", marginBottom: "15px", borderRadius: "5px", backgroundColor: "#2F0B33", color: "#FFFFFF", border: "1px solid #FFFFFF", fontSize: "16px" }}
              />
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", backgroundColor: "#2F0B33", color: "#FFFFFF", border: "1px solid #FFFFFF", fontSize: "16px" }}
            />

            {/* Error Message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
              onClick={handleSignUp}
              style={{ width: "100%", padding: "12px", backgroundColor: "#75E0E4", color: "#FFFFFF", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer" }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
