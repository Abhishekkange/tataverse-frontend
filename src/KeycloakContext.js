import React, { createContext, useContext, useState, useEffect } from "react";
import Keycloak from "keycloak-js";

// Create a Context for Keycloak
const KeycloakContext = createContext();

export const useKeycloak = () => {
  return useContext(KeycloakContext);
};

export const KeycloakProvider = ({ children }) => {
  const [keycloakInstance, setKeycloakInstance] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize Keycloak only once when the app loads
    const keycloak = new Keycloak({
      url: "https://lemur-3.cloud-iam.com/auth",  // Your Keycloak server URL
      realm: "abc",  // Your Keycloak realm
      clientId: "abhishek-kange",  // Your client ID in Keycloak
    });

    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      setIsAuthenticated(authenticated);
      setKeycloakInstance(keycloak);
    }).catch((error) => {
      console.error("Error during Keycloak initialization", error);
    });
  }, []); // Empty dependency array ensures this runs once

  return (
    <KeycloakContext.Provider value={{ keycloakInstance, isAuthenticated }}>
      {children}
    </KeycloakContext.Provider>
  );
};
