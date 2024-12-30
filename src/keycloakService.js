import Keycloak from 'keycloak-js';

export  const keycloak = new Keycloak({
    url: "https://lemur-3.cloud-iam.com/auth",  // Your Keycloak server URL
    realm: "abc",  // Your Keycloak realm
    clientId: "abhishek-kange",  // Your client ID in Keycloak
  });

// Initialize Keycloak
export const initKeycloak = (onAuthenticatedCallback) => {
  keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
    if (authenticated) {
      onAuthenticatedCallback();
    } else {
      window.location.reload();
    }
  });
};

// Function to handle logout
export const handleLogout = () => {
  keycloak.logout();
};

// Function to handle token refresh
export const refreshToken = () => {
  keycloak.updateToken(70).then((refreshed) => {
    if (refreshed) {
      console.log("Token refreshed");
    }
  }).catch((error) => {
    console.error("Error refreshing token", error);
  });
};
