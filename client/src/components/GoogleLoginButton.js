import React from "react";

import { GoogleLogin } from "react-google-login";
import { toast } from "react-toastify";

import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";

const GOOGLE_CLIENT_ID =
  "358508671216-bvlr36t076i7qjj9jel835mgb7f5nkqp.apps.googleusercontent.com";

const GoogleLoginButton = () => {
  const googleSuccess = async (response) => {
    console.log(response);
  };

  const googleFailure = async (error) => {
    toast.error(error);
    console.log(error);
  };
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          variant="contained"
          color="info"
          startIcon={<Google />}
          sx={{
            width: "100%",
            my: 2,
            borderRadius: "24px",
          }}
        >
          Login with Google
        </Button>
      )}
      onSuccess={googleSuccess}
      onFailure={googleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleLoginButton;
