import React, { useState } from 'react';
import axios from 'axios';

const styles = `
.forgot-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.card {
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 350px;
    max-width: 100%;
}

h2 {
    margin-bottom: 20px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #333;
}

.form-group input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.reset-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.reset-button:hover {
    background-color: #0056b3;
}

.success-message {
    color: #28a745;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
}

.error-message {
    color: red;
    font-size: 16px;
    margin-top: 20px;
}
`;



const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const GRANT_TYPE = "client_credentials";
    const CLIENT_ID = "abhishek";
    const CLIENT_SECRET = "dSVuLepCsnskzRtzmmXE99PBYkNgapHP";
    const REALM_NAME = "tatatechnologies";
    const SERVER_URL = "lemur-17.cloud-iam.com";

    const fetchAccessToken = async (grantType, clientId, clientSecret, realmName) => {
        try {
          // API Request to get the access token
          const tokenResponse = await axios.post(
            `https://${SERVER_URL}/auth/realms/${realmName}/protocol/openid-connect/token`,
            new URLSearchParams({
              grant_type: grantType,
              client_id: clientId,
              client_secret: clientSecret
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          );
      
          const accessToken = tokenResponse.data.access_token;
          
          if (!accessToken) {
            throw new Error("Failed to get access token.");
          }
      
          return accessToken; // Return the access token for further use
        } catch (error) {
          console.error("Error fetching access token:", error.message);
          throw error; // Propagate error for handling in the calling function
        }
      };

const getUserDetailsByEmail = async (email,realm_name,server_url,token) => {
    try {
        const url = `https://${server_url}/auth/admin/realms/${realm_name}/users?email=${encodeURIComponent(email)}`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.length > 0) {
            console.log('User details:', response.data[0]);  // Assuming it returns an array of users, take the first one
            return response.data[0];  // Return the user details
        } else {
            console.log('No user found with the provided email.');
            return null;
        }
    } catch (err) {
        console.error('Error fetching user details:', err);
        return null;
    }
};
      

    const sendResetPasswordEmail = async (realmName, userId,token,SERVER_URL) => {
        try {
            const url = `https://${SERVER_URL}/auth/realms/admin/realms/${realmName}/users/${userId}/reset-password-email`;
    
            const response = await axios.put(
                url,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.status === 204) {
                console.log('Reset password email sent successfully.');
            } else {
                console.log('Failed to send reset password email:', response.data);
            }
        } catch (err) {
            console.error('Error sending reset password email:', err);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {

            //get access token
            const token = await fetchAccessToken(GRANT_TYPE,CLIENT_ID,CLIENT_SECRET,REALM_NAME);
            console.log("Token:",token);
            const userdetails = await getUserDetailsByEmail(email,REALM_NAME,SERVER_URL,token);
            console.log("User ID:",userdetails.id);
            const response = await sendResetPasswordEmail(REALM_NAME,userdetails.id,token,SERVER_URL);
            console.log("Response:",response);
            console.log("EXECUTED")
            
           


        } catch (err) {
            console.error('Error during reset request:', err);
            setErrorMessage('Failed to send reset link. Please try again.');
            alert('Failed to send reset link. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <style>{styles}</style>
            <div className="card">
                <h2>Forgot Password</h2>
                {successMessage ? (
                    <div className="success-message">{successMessage}</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="reset-button" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default ForgotPassword;