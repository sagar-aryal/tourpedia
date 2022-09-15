import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createTour } from "../redux/features/tourSlice";

import { Box, Button, TextField, Typography } from "@mui/material";

const TourForm = () => {
  const { error } = useSelector((state) => state.tour);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  error message from backend
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const formik = useFormik({
    initialValues: {
      title: " ",
      description: " ",
      tags: [],
      image: " ",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(20, "Title should not be more than 20 characters")
        .required("Required"),
      description: Yup.string()
        .max(1000, "Description should not be more than 1000 characters")
        .required("Required"),
      tags: Yup.string().required("Required"),
      image: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (values.title && values.description && values.tags && values.image) {
        const tourData = { values, name: user?.user.name };
        dispatch(createTour({ tourData, navigate, toast }));
      }
      setTimeout(() => {
        resetForm({ values: "" });
      }, "1000");
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        margin: "12px auto",
        maxWidth: "380px",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5">
          Add Tour
        </Typography>

        <TextField
          required
          fullWidth
          autoFocus
          id="title"
          label="Enter Title"
          name="title"
          type="text"
          placeholder="Add title"
          sx={{ mt: 5, mb: 3 }}
          onChange={formik.handleChange}
          value={formik.values.title}
          onBlur={formik.handleBlur}
          error={formik.touched.title && formik.errors.title ? true : false}
        />
        {formik.touched.title && formik.errors.title ? (
          <div
            style={{
              color: "red",
              alignSelf: "flex-start",
              marginBottom: "24px",
            }}
          >
            {formik.errors.title}
          </div>
        ) : null}

        <TextField
          required
          fullWidth
          multiline
          rows={4}
          id="description"
          label="Enter Description"
          name="description"
          type="text"
          placeholder="Add description"
          sx={{ mb: 3 }}
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && formik.errors.description
              ? true
              : false
          }
        />
        {formik.touched.description && formik.errors.description ? (
          <div
            style={{
              color: "red",
              alignSelf: "flex-start",
              marginBottom: "24px",
            }}
          >
            {formik.errors.description}
          </div>
        ) : null}

        <TextField
          required
          fullWidth
          id="tags"
          label="Enter Tags"
          name="tags"
          type="text"
          placeholder="Add tags. For example #traveller #holidays"
          sx={{ mb: 3 }}
          onChange={formik.handleChange}
          value={formik.values.tags}
          onBlur={formik.handleBlur}
          error={formik.touched.tags && formik.errors.tags ? true : false}
        />
        {formik.touched.tags && formik.errors.tags ? (
          <div
            style={{
              color: "red",
              alignSelf: "flex-start",
              marginBottom: "24px",
            }}
          >
            {formik.errors.tags}
          </div>
        ) : null}

        <Box mb={3} alignSelf="flex-start">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
            onBlur={formik.handleBlur}
            error={formik.touched.image && formik.errors.image ? true : false}
          />
        </Box>
        {formik.touched.image && formik.errors.image ? (
          <div
            style={{
              color: "red",
              alignSelf: "flex-start",
              marginBottom: "24px",
            }}
          >
            {formik.errors.image}
          </div>
        ) : null}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mb: 3 }}
        >
          Add
        </Button>

        <Button type="submit" fullWidth variant="contained" color="error">
          Clear
        </Button>
      </Box>
    </form>
  );
};

export default TourForm;
