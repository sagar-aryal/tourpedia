import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setLogout } from "../redux/features/authSlice";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Box,
} from "@mui/material";

const navItems = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Add", link: "/add" },
  { id: 3, name: "Dashboard", link: "/dashboard" },
];

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              width: "100px",
              marginRight: "20px",
            }}
          >
            <Typography variant="h5">Tourpedia</Typography>
          </Link>

          <List
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {navItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            type="text"
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{
              background: "white",
              border: "none",
              marginRight: "20px",
            }}
          >
            Search
          </TextField>
          {user && (
            <Typography variant="h6" mr={2}>
              {user.user.name}
            </Typography>
          )}

          {user ? (
            <Button variant="contained" color="info" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="info"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
