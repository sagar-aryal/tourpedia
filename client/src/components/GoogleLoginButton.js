import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { googleSignIn } from "../redux/features/authSlice";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCallbackResponse = (res) => {
    const token = res.credential;
    const userObj = jwt_decode(token);
    const name = userObj?.name;
    const email = userObj?.email;
    const googleId = userObj?.sub;
    const tokenId = userObj?.jti;
    const userData = { name, email, googleId, tokenId };
    console.log(userData);
    dispatch(googleSignIn({ userData, navigate, toast }));
  };

  useEffect(() => {
    /*  global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return <div id="signInDiv"></div>;
};

export default GoogleLoginButton;
