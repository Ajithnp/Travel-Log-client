import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuth = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    return <p>Error: Google Client ID is missing</p>;
  }
  console.log('idddd', clientId);
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const token = credentialResponse.credential;
          const clientId = credentialResponse.clientId;
          console.log(token + "client_id", clientId);
          console.log(credentialResponse);

          try {
            const res = await fetch(
              "http://localhost:3001/api/v1/auth/google/callback",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, clientId }),
              }
            );

            const data = await res.json();
            console.log("Backend Response:", data);
          } catch (error) {
            console.error("Backend error:", error);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
