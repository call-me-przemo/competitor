"use client";

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RunCircleOutlinedIcon from "@mui/icons-material/RunCircleOutlined";
import orange from "@mui/material/colors/orange";
import MuiLink from "@mui/material/Link";
import NextLink from "next/link";

export function Navbar({ pages }: { pages: string[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBar component="nav">
        <Toolbar sx={{ mx: 0, justifyContent: "space-between" }}>
          <MuiLink
            href={"/"}
            component={NextLink}
            underline="none"
            sx={{ display: "flex", color: "inherit", alignItems: "center" }}
          >
            <RunCircleOutlinedIcon
              sx={{ m: 0.5, fontSize: { xs: 30, sm: 50 } }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Competitor
            </Typography>
          </MuiLink>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {pages.map((page) => (
              <Button
                component={NextLink}
                href={page}
                key={page}
                sx={{ color: "#fff" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        component={"nav"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor="right"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            <Box component="span" sx={{ color: orange[500] }}>
              C
            </Box>
            ompetitor
          </Typography>
          <Divider />
          <List>
            {pages.map((page) => (
              <ListItem key={page} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  component={NextLink}
                  href={page}
                >
                  <ListItemText primary={page} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
