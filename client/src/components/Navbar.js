import React from "react";
import { Link } from "react-router-dom";

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
  { id: 2, name: "Add", link: "/" },
  { id: 3, name: "Dashboard", link: "/" },
];

const Navbar = () => {
  return (
    <AppBar sx={{ marginBottom: "80px" }}>
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
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton>
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
            alignItems: "center",
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

          <Button variant="contained" color="info" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
