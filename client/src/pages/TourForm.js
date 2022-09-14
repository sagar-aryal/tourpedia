import React from "react";
import { useFormik } from "formik";

import { Box, Button, TextField, Typography } from "@mui/material";

const TourForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      tags: [],
      image: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
        />

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
        />

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
        />

        <Box mb={3} alignSelf="flex-start">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
          />
        </Box>

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
