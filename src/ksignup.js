import React, { useState } from 'react';
import axios from 'axios';

const styles = `
.signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    background-image: url('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjpuxXSDs6vA1s89l5HO0ADie98zuqgnmr7MYpOKEerHKyLQMZADri31yj43I_ju_6cmgbVHRIRvgP3dZyYxMxdS1DJ2W5Nt6trDhNVQIE6ZbUaUeYTB1ey1b7AR0SY3Z2p84uXg7RaGQuEKlCakfqp4R6ZkAZaQL_PcXJou2k4dOaRKV9-Vts0Sql1p0U/w660-h374/Leonardo_Phoenix_10_Create_a_futuristic_VR_image_with_a_glowin_3.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.card {
    background: rgba(255, 255, 255, 0.8); 
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 400px; 
}

.logo {
    width: 150px;
    margin-bottom: 20px;
}

h2 {
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.signup-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.signup-button:hover {
    background-color: #0056b3;
}
`;

const KSignup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const fetchAdminToken = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/realms/myrealm/protocol/openid-connect/token',
                new URLSearchParams({
                    client_id: 'abhishekkange',
                    client_secret: 'TzDXZ4JYv2JIiNkaCzVUeTrkOEnfzMed',
                    grant_type: 'client_credentials',
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            return response.data.access_token;
        } catch (error) {
            console.error('Error fetching admin token:', error);
            throw new Error('Failed to fetch admin token.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const userPayload = {
            username: formData.username,
            email: formData.email,
            enabled: true,
            firstName: 'Pratik',
            lastName: 'Agrawal',
            credentials: [
                {
                    type: 'password',
                    value: formData.password,
                    temporary: false,
                },
            ],
        };

        try {
            const adminToken = await fetchAdminToken();

            const response = await axios.post(
                'http://localhost:8080/admin/realms/myrealm/users',
                userPayload,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                console.log('User created successfully:', response.data);
            }
        } catch (err) {
            console.error('Error creating user:', err.response || err);
            setError('Failed to create user. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <style>{styles}</style>
            <div className="card">
                <img
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiseDmh0JlMjdoMe1WSzckhklxoLgzKw-SRLOfwAZlYiHysuAS7MsZXFQnSdEBjAS8uWpUs285Tq0QYMxjH3P3W0iyORahUBKuwf8Y6tqY53tIro19jXv4v1iCetehEp6riKprxu_VkxtPajQ_ndCrhl_kVMkcKWqbCAMWU1axEfNsYkmahu6edbEBXVLc/s320/pngwing.com.png"
                    alt="Logo"
                    className="logo"
                />
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button" disabled={isLoading}>
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default KSignup;
