//@ts-nocheck
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useTheme } from "next-themes";
export default function Drawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [isOpen, setOpen] = useState(false);
//   const [darkMode,setDarkMode] = useState(false)
  const { theme, setTheme } = useTheme()


  const toggleDrawer = (anchor: any, open: any) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box
     sx={{
        width: 300,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f6f7fc",
    }}
    >


    <Card
    className="drawer-card"
    style={{fontSize:'1.2rem',
    fontWeight:'600',display:'flex',
    padding:'1rem',
    height:'fit-content',
    marginTop:'6vh',
    width:'80%',
    padding:'1rem'
  
    }}>
        📝 Saved Notes
    </Card>
    </Box>
);

return (
    <div>
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuIcon className="drawerBurger" fontSize="large" />
      </div>
      <SwipeableDrawer
        anchor={"left"}
        open={isOpen}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
