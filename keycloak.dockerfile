# Use the official Keycloak image as the base
FROM quay.io/keycloak/keycloak:latest
# Set environment variables for Keycloak
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_DB=postgres
# Copy your custom themes
COPY themes /opt/keycloak/themes/
# Copy your custom realm configuration
COPY realm-config /opt/keycloak/data/import/
# Optionally copy custom provider JARs if you have extensions
COPY providers /opt/keycloak/providers/
# Set the Keycloak command to auto-import realms and start
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--auto-build", "--import-realm"]
has context menu