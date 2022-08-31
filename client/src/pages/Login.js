import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../redux/features/authSlice";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { AccountBox, Google } from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => ({ ...state.auth }));

  // login error message from backend
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        /*  .matches(
          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
          "Password must contain number, uppercase letter, lowercase letter and  non-alpha numeric number"
        ) */
        .required("Required"),
    }),

    onSubmit: (values, { resetForm }) => {
      // console.log(values);
      if (values.email && values.password) {
        dispatch(login({ values, navigate, toast }));
      }
      setTimeout(() => {
        resetForm({ values: "" });
      }, "1000");
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        style={{
          border: "1px solid lightgray",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "400px",
          margin: " 80px auto",
          textAlign: "center",
        }}
      >
        <AccountBox fontSize="large" color="secondary" />
        <Typography variant="h5" color="secondary" p={2}>
          Login
        </Typography>
        <TextField
          required
          id="email"
          label="Email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email ? true : false}
          sx={{ width: "100%", my: 1 }}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red", textAlign: "left" }}>
            {formik.errors.email}
          </div>
        ) : null}
        <TextField
          required
          id="password"
          label="Password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password ? true : false
          }
          sx={{ width: "100%", my: 1 }}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red", textAlign: "left" }}>
            {formik.errors.password}
          </div>
        ) : null}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ width: "100%", my: 2, borderRadius: "24px" }}
        >
          Login
        </Button>
        <Divider sx={{ fontSize: "20px" }}>or</Divider>
        <Button
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
        <Card>
          <Typography variant="body1" m={2}>
            Don't have an account?
            <Link
              component={Link}
              to="/register"
              style={{ color: "blueviolet", textDecoration: "none" }}
            >
              <span
                style={{
                  paddingLeft: "5px",
                }}
              >
                Register
              </span>
            </Link>
          </Typography>
        </Card>
      </Box>
    </form>
  );
};

export default Login;
