import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/user.slice";
import { useNavigate } from "react-router-dom";
import { useGoogleSignMutation } from "../hooks/auth.hooks";
import { toast } from "sonner";


const GoogleAuth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const {mutate:googleSign} = useGoogleSignMutation()
  if (!clientId) {
    return <p>Error: Google Client ID is missing</p>;
  }
 
  
  return (
    <GoogleOAuthProvider clientId={clientId}>
       <GoogleLogin 
        onSuccess={async (credentialResponse) => {
          const token = credentialResponse.credential ;
          const clientId = credentialResponse.clientId;
         if(!token || !clientId){
           toast.error("Google login failed — missing token or client ID");
          return
         }
          googleSign({token, clientId},
            {
              onSuccess: (response) => {
                dispatch(setUser(response.data))
                navigate('/')
              },
              onError: (error) => {
                toast.error(error?.response?.data?.message || error?.message)
              }
            }
          )
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        
      />
      
     
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
