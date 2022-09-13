import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../redux/features/authSlice";

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
import GoogleLoginButton from "../components/GoogleLoginButton";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => ({ ...state.auth }));

  // login error message from backend
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().max(20).required("Required"),
      lastName: Yup.string().max(20).required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        /*  .matches(
          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
          "Password must contain number, uppercase letter, lowercase letter and  non-alpha numeric number"
        ) */
        .required("Required"),
      confirmPassword: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        /*  .matches(
          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
          "Password must contain number, uppercase letter, lowercase letter and  non-alpha numeric number"
        ) */
        .required("Required"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (values.password !== values.confirmPassword) {
        return toast.error("Password should match");
      }
      if (
        values.firstName &&
        values.lastName &&
        values.email &&
        values.password &&
        values.confirmPassword
      ) {
        dispatch(register({ values, navigate, toast }));
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
          Sign Up
        </Typography>
        <TextField
          required
          id="firstName"
          label="First Name"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          onBlur={formik.handleBlur}
          error={
            formik.touched.firstName && formik.errors.firstName ? true : false
          }
          sx={{ width: "100%", my: 1 }}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div style={{ color: "red", textAlign: "left" }}>
            {formik.errors.firstName}
          </div>
        ) : null}
        <TextField
          required
          id="lastName"
          label="Last Name"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          onBlur={formik.handleBlur}
          error={
            formik.touched.lastName && formik.errors.lastName ? true : false
          }
          sx={{ width: "100%", my: 1 }}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div style={{ color: "red", textAlign: "left" }}>
            {formik.errors.lastName}
          </div>
        ) : null}
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
        <TextField
          required
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? true
              : false
          }
          sx={{ width: "100%", my: 1 }}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div style={{ color: "red", textAlign: "left" }}>
            {formik.errors.confirmPassword}
          </div>
        ) : null}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ width: "100%", my: 2, borderRadius: "24px" }}
        >
          Sign Up
        </Button>
        {/* <Divider sx={{ fontSize: "20px", mb: 2 }}>or</Divider>
        <GoogleLoginButton /> */}
        <Card sx={{ marginTop: "18px" }}>
          <Typography variant="body1" m={2}>
            Already have an account?
            <Link
              component={Link}
              to="/login"
              style={{ color: "blueviolet", textDecoration: "none" }}
            >
              <span
                style={{
                  paddingLeft: "5px",
                }}
              >
                Login
              </span>
            </Link>
          </Typography>
        </Card>
      </Box>
    </form>
  );
};

export default Register;
