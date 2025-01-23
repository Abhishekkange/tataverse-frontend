import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const GRANT_TYPE = "client_credentials";
    const CLIENT_ID = "abhishek";
    const CLIENT_SECRET = "sUxY2zlHtDDW3NoCgyGgF6MUD2cezKC2";
    const REALM_NAME = "tatatechnologies";
    const SERVER_URL = "keycloak.runtimetheory.com";

    const styles = {
        container: {
            backgroundColor: "#2F0B33",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            color: "#FFFFFF",
            fontFamily: "Arial, sans-serif",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            overflow: "hidden"
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            '@media (max-width: 768px)': {
                padding: "10px",
            }
        },
        logo: {
            display: "flex",
            gap: "10px",
            fontFamily: "'Arial', sans-serif",
            fontSize: "18px",
            fontWeight: "bold",
            width: "200px",
            height: "15px",
            alignItems: "center",
            '@media (max-width: 768px)': {
                width: "150px",
            }
        },
        mainContent: {
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            gap: "20px",
            '@media (max-width: 768px)': {
                flexDirection: "column-reverse",
                padding: "10px",
                gap: "10px",
            }
        },
        formSection: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            '@media (max-width: 768px)': {
                padding: "10px",
                width: "100%",
            }
        },
        formContainer: {
            width: "400px",
            maxWidth: "100%",
            padding: "30px",
            '@media (max-width: 768px)': {
                width: "100%",
                padding: "15px",
            }
        },
        title: {
            fontFamily: "'Roboto', sans-serif",
            fontWeight: "bold",
            fontSize: "44px",
            color: "#75E0E4",
            marginBottom: "20px",
            '@media (max-width: 768px)': {
                fontSize: "32px",
                marginBottom: "15px",
            },
            '@media (max-width: 480px)': {
                fontSize: "28px",
            }
        },
        subtitle: {
            color: "#FFFFFF",
            fontSize: "16px",
            marginBottom: "30px",
            '@media (max-width: 768px)': {
                fontSize: "14px",
                marginBottom: "20px",
            }
        },
        inputGroup: {
            marginBottom: "20px",
            width: "100%",
        },
        label: {
            display: "block",
            color: "#FFFFFF",
            marginBottom: "8px",
            textAlign: "left",
            fontSize: "16px",
            '@media (max-width: 768px)': {
                fontSize: "14px",
            }
        },
        input: {
            width: "100%",
            padding: "12px",
            backgroundColor: "#250929",
            border: "1px solid #FFFFFF",
            color: "#FFFFFF",
            fontSize: "16px",
            boxSizing: "border-box",
            '@media (max-width: 768px)': {
                padding: "10px",
                fontSize: "14px",
            }
        },
        button: {
            width: "100%",
            padding: "12px",
            backgroundColor: "#75E0E4",
            color: "black",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px",
            '@media (max-width: 768px)': {
                padding: "10px",
                fontSize: "14px",
                marginTop: "15px",
            }
        },
        message: {
            marginTop: "20px",
            textAlign: "center",
            '@media (max-width: 768px)': {
                marginTop: "15px",
                fontSize: "14px",
            }
        },
        successMessage: {
            color: "#75E0E4",
        },
        errorMessage: {
            color: "red",
        },
        imageSection: {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            '@media (max-width: 768px)': {
                display: "none", // Hide on mobile
            }
        },
        sectionImage: {
            width: "68%",
            height: "100%",
            minHeight: "500px",
            borderRadius: "8px",
            '@media (max-width: 1024px)': {
                width: "80%",
                minHeight: "400px",
            },
            '@media (max-width: 768px)': {
                width: "100%",
                minHeight: "300px",
            }
        },
        successOverlay: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "rgba(47, 11, 51, 0.95)",
            borderRadius: "8px",
            border: "1px solid #75E0E4",
            marginTop: "20px",
            '@media (max-width: 768px)': {
                padding: "15px",
                marginTop: "15px",
            }
        },
        successIcon: {
            color: "#75E0E4",
            fontSize: "48px",
            marginBottom: "15px",
            '@media (max-width: 768px)': {
                fontSize: "36px",
                marginBottom: "10px",
            }
        },
        successTitle: {
            color: "#75E0E4",
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "10px",
            '@media (max-width: 768px)': {
                fontSize: "20px",
            }
        },
        successMessage: {
            color: "#FFFFFF",
            fontSize: "16px",
            lineHeight: "1.5",
            marginBottom: "20px",
            '@media (max-width: 768px)': {
                fontSize: "14px",
                marginBottom: "15px",
            }
        }
    };

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

    const getUserDetailsByEmail = async (email, realm_name, server_url, token) => {
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


    const sendResetPasswordEmail = async (realmName, userId, token, SERVER_URL) => {
        try {
            const url = `https://${SERVER_URL}/auth/admin/realms/${realmName}/users/${userId}/reset-password-email`;
            console.log("URL:", url);

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
            const token = await fetchAccessToken(GRANT_TYPE, CLIENT_ID, CLIENT_SECRET, REALM_NAME);
            console.log("Token:", token);
            const userdetails = await getUserDetailsByEmail(email, REALM_NAME, SERVER_URL, token);
            console.log("User ID:", userdetails.id);
            const token2 = await fetchAccessToken(GRANT_TYPE, CLIENT_ID, CLIENT_SECRET, REALM_NAME);
            await sendResetPasswordEmail(REALM_NAME, userdetails.id, token2, SERVER_URL);
            
            // Instead of alert, set success state
            setIsSuccess(true);
            setSuccessMessage('Password reset link sent successfully!');
        } catch (err) {
            console.error('Error during reset request:', err);
            setErrorMessage('Failed to send reset link. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const SuccessMessage = () => (
        <div style={styles.successOverlay}>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.successTitle}>Email Sent Successfully!</h2>
            <p style={styles.successMessage}>
                We've sent a password reset link to <strong>{email}</strong>.<br />
                Please check your email and follow the instructions to reset your password.
            </p>
            <p style={styles.successMessage}>
                Didn't receive the email? Please check your spam folder or try again.
            </p>
        </div>
    );

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.logo}>
                    <svg
                        className="aspect-[196/14] w-[170px] lg:w-[196px]"
                        viewBox="0 0 196 14"
                    >
                        <title>Tata Technologies</title>
                        <path
                            d="M0,0.242 L13.055,0.242 L13.055,4.182 L9.306,4.182 L9.306,13.758 L3.868,13.758 L3.868,4.182 L0,4.182 z M19.643,5.697 L16.862,13.758 L11.664,13.758 L16.803,0.242 L22.484,0.242 L27.742,13.759 L22.424,13.759 L19.644,5.697 z M26.472,0.242 L39.527,0.242 L39.527,4.182 L35.779,4.182 L35.779,13.758 L30.339,13.758 L30.339,4.182 L26.472,4.182 z M46.114,5.697 L43.395,13.758 L38.136,13.758 L43.274,0.242 L48.955,0.242 L54.213,13.759 L48.894,13.759 L46.115,5.697 z M150.189,14 L150.189,12 C152.607,12 153.936,9.819 153.936,6.97 C153.936,4.424 152.666,2 150.189,2 L150.189,0 L150.308,0 C154.238,0 156.596,2.97 156.596,6.849 C156.596,11.394 153.875,13.939 150.189,13.999 z M169.891,6.303 L165.117,6.303 L165.117,8.243 L167.474,8.243 L167.474,11.636 C167.172,11.758 166.506,11.879 165.6,11.879 C162.821,11.879 160.887,10.06 160.887,6.969 C160.887,3.879 162.94,2.121 165.842,2.121 C167.232,2.121 168.138,2.364 168.924,2.727 L169.468,0.727 C168.804,0.424 167.534,0.061 165.842,0.061 C161.369,0.061 158.408,2.849 158.408,7.152 C158.348,9.152 159.072,10.97 160.221,12.12 C161.49,13.332 163.243,13.939 165.54,13.939 C167.293,13.939 168.984,13.454 169.891,13.152 z M172.369,13.758 L174.848,13.758 L174.848,0.243 L172.369,0.243 z M184.82,5.758 L179.743,5.758 L179.743,2.243 L185.123,2.243 L185.123,0.243 L177.264,0.243 L177.264,13.758 L185.423,13.758 L185.423,11.758 L179.743,11.758 L179.743,7.758 L184.82,7.758 z M187.237,13.152 C187.964,13.575 189.473,14 190.863,14 C194.369,14 196,12.12 196,9.94 C196,7.94 194.852,6.788 192.556,5.879 C190.742,5.212 189.956,4.728 189.956,3.637 C189.956,2.849 190.621,2.061 192.193,2.061 C193.462,2.061 194.369,2.424 194.852,2.666 L195.456,0.666 C194.731,0.303 193.704,0 192.193,0 C189.292,0 187.418,1.697 187.418,3.879 C187.418,5.819 188.869,7.031 191.105,7.818 C192.797,8.486 193.522,9.091 193.522,10.06 C193.522,11.213 192.617,11.94 191.045,11.94 C189.776,11.94 188.567,11.515 187.781,11.091 L187.237,13.151 z M150.189,0 L150.189,2 C147.711,2 146.441,4.364 146.441,7.03 C146.441,9.757 147.832,12 150.189,12 L150.189,14 L150.067,14 C146.261,14 143.842,11.091 143.842,7.091 C143.842,2.971 146.441,0.061 150.189,0.001 z M127.162,14 L127.162,12 C129.579,12 130.908,9.819 130.908,6.97 C130.908,4.424 129.64,2 127.162,2 L127.162,0 L127.282,0 C131.211,0 133.506,2.97 133.506,6.849 C133.506,11.394 130.85,13.939 127.162,13.999 z M135.623,13.758 L143.661,13.758 L143.661,11.697 L138.1,11.697 L138.1,0.242 L135.623,0.242 L135.623,13.76 z M64.851,13.758 L67.328,13.758 L67.328,2.304 L71.196,2.304 L71.196,0.242 L60.982,0.242 L60.982,2.304 L64.851,2.304 z M127.162,0 L127.162,2 C124.683,2 123.415,4.364 123.415,7.03 C123.415,9.757 124.804,12 127.162,12 L127.162,14 L127.042,14 C123.233,14 120.817,11.091 120.817,7.091 C120.817,2.971 123.415,0.061 127.162,0.001 z M80.746,5.758 L75.608,5.758 L75.608,2.243 L81.048,2.243 L81.048,0.243 L73.191,0.243 L73.191,13.758 L81.35,13.758 L81.35,11.758 L75.609,11.758 L75.609,7.758 L80.745,7.758 L80.745,5.758 z M92.772,11.394 C92.168,11.697 91.079,11.939 90.113,11.939 C87.152,11.939 85.399,10 85.399,7.031 C85.399,3.758 87.394,2.061 90.113,2.061 C91.261,2.061 92.168,2.303 92.772,2.606 L93.316,0.606 C92.833,0.365 91.684,0 90.053,0 C85.883,0 82.8,2.727 82.8,7.152 C82.8,11.272 85.399,14 89.691,14 C91.322,14 92.591,13.697 93.196,13.394 L92.773,11.394 z M95.311,0.242 L95.311,13.76 L97.789,13.76 L97.789,7.817 L103.469,7.817 L103.469,13.757 L105.948,13.757 L105.948,0.242 L103.469,0.242 L103.469,5.637 L97.789,5.637 L97.789,0.242 z M110.481,13.758 L110.481,8.91 C110.481,6.729 110.42,4.91 110.301,3.153 L110.36,3.153 C111.024,4.668 111.932,6.304 112.838,7.819 L116.344,13.759 L118.882,13.759 L118.882,0.242 L116.585,0.242 L116.585,4.97 C116.585,7.03 116.645,8.787 116.827,10.545 L116.766,10.606 C116.135,9.027 115.367,7.506 114.471,6.061 L110.964,0.242 L108.184,0.242 L108.184,13.758 z"
                            fill="white"
                        ></path>
                    </svg>
                </div>
                <svg
                    className="aspect-[96/25]"
                    viewBox="0 0 269.6 56.7"
                    style={{ width: '100px', height: '50px' }}
                >
                    <title>The Tata group. Leadership with Trust.</title>
                    <polygon
                        points="99.4 7.1 140.4 7.1 140.4 19.6 128.6 19.6 128.6 49.6 111.5 49.6 111.5 19.6 99.4 19.6 99.4 7.1 99.4 7.1"
                        style={{ fill: 'currentColor', fillRule: 'evenodd' }}
                    />
                    <polygon
                        points="161.1 24.3 152.5 49.6 136.1 49.6 152.2 7.1 170 7.1 186.5 49.6 169.9 49.6 161.1 24.3 161.1 24.3"
                        style={{ fill: 'currentColor', fillRule: 'evenodd' }}
                    />
                    <polygon
                        points="182.5 7.1 223.5 7.1 223.5 19.6 211.8 19.6 211.8 49.6 194.7 49.6 194.7 19.6 182.5 19.6 182.5 7.1 182.5 7.1"
                        style={{ fill: 'currentColor', fillRule: 'evenodd' }}
                    />
                    <polygon
                        points="244.3 24.3 235.7 49.6 219.3 49.6 235.4 7.1 253.2 7.1 269.6 49.6 253 49.6 244.3 24.3 244.3 24.3"
                        style={{ fill: 'currentColor', fillRule: 'evenodd' }}
                    />
                    <path
                        d="M253.6,387a26.77,26.77,0,0,0-4-5.7,39.11,39.11,0,0,0-15.3-9.7,61.38,61.38,0,0,0-20.8-3.6,59,59,0,0,0-20.8,3.6,39.86,39.86,0,0,0-15.3,9.7,23.61,23.61,0,0,0-4,5.7,169.71,169.71,0,0,1,35-4.8,3.39,3.39,0,0,1,2.7,1.1c.7.9.6,4,.6,5.4h0l-.4,36h4.4l-.4-36h0c0-1.4-.1-4.5.6-5.4a3.25,3.25,0,0,1,2.7-1.1c12.9.3,26.8,2.9,35,4.8Z"
                        transform="translate(-170.9 -368)"
                        style={{ fill: 'currentColor', fillRule: 'evenodd' }}
                    />
                    <path
                        d="M255.3,391.7a146.72,146.72,0,0,0-27.7-3.6c-6.8-.4-6.9,2.1-6.3,6.7a6.53,6.53,0,0,0,.2,1.1c2.3,13.6,5.2,25.3,5.6,27.3,16.7-3.8,28.7-14.4,28.7-26.8a14.76,14.76,0,0,0-.5-4.7Z"
                        transform="translate(-170.9 -368)"
                        style={{ fill: 'currentColor', fillRule: 'evenodd' }}
                    />
                    <path
                        d="M205.6,394.8c.7-4.7.6-7.1-6.3-6.7a147.6,147.6,0,0,0-27.8,3.6,18.16,18.16,0,0,0-.6,4.6,21.93,21.93,0,0,0,6.3,15,39.11,39.11,0,0,0,15.3,9.7c2.3.8,4.7,1.5,7.1,2.1.5-1.9,3.4-13.8,5.7-27.7.2-.1.2-.4.3-.6Z"
                        transform="translate(-170.9 -368)"
                        style={{ fill: 'currentColor', fillRule: 'evenodd' }}
                    />
                </svg>
            </header>

            <div style={styles.mainContent}>
                <div style={styles.formSection}>
                    <div style={styles.formContainer}>
                        <h1 style={styles.title}>Forgot Password?</h1>
                        <p style={styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</p>

                        {!isSuccess ? (
                            <form onSubmit={handleSubmit}>
                                <div style={styles.inputGroup}>
                                    <label htmlFor="email" style={styles.label}>Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={styles.input}
                                        required
                                    />
                                </div>
                                <button type="submit" style={styles.button} disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Reset Password'}
                                </button>
                                
                                {errorMessage && (
                                    <div style={{...styles.message, ...styles.errorMessage}}>
                                        {errorMessage}
                                    </div>
                                )}
                            </form>
                        ) : (
                            <SuccessMessage />
                        )}
                    </div>
                </div>

                <div style={styles.imageSection}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={styles.sectionImage}
                        viewBox="0 0 173.189 216.399"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            d="M125.493.18 42.325 216.218"
                            style={{ fill: "none", stroke: "#fff", strokeMiterlimit: 10 }}
                        />
                        <path
                            d="M137.3.18 54.132 216.219"
                            style={{ fill: "none", stroke: "#69c4d2", strokeMiterlimit: 10 }}
                        />
                        <path
                            d="M149.108.18 65.939 216.219M149.108.18 65.939 216.219M172.722.18 89.554 216.219"
                            style={{ fill: "none", stroke: "#fff", strokeMiterlimit: 10 }}
                        />
                        <path
                            d="M160.915.18 77.746 216.219M26.468 123.771l-4.881 12.615M52.066 106.514l-9.065 23.788"
                            style={{ fill: "none", stroke: "#69c4d2", strokeMiterlimit: 10 }}
                        />
                        <path
                            style={{ fill: "none", stroke: "#fff", strokeMiterlimit: 10 }}
                            d="m61.083 167.49-26.175 15.084-2.899 13.464 20.077-5.176M102.373 60.235v-15.45a31.656 31.656 0 0 0-7.669-20.658c-4.27-4.959-11.951-4.959-16.221 0a31.658 31.658 0 0 0-7.669 20.658v39.149l-66.72 39.06-3.563 19.375 71.302-20.258v17.458"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;