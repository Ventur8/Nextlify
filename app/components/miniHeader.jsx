import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import List from '@mui/material/List';
import { signOut, useSession } from "next-auth/react";
import { Avatar, Button } from "@mui/material";
import { maxHeight } from "@mui/system";
import { useRecoilValue } from "recoil";
import { playlistState } from "../../atoms/playlistAtom";
import { useState,useEffect } from "react";
import Link from 'next/link';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from 'recoil';
import {playlistIdState} from "../../atoms/playlistAtom"
import { MainBody } from './mainBody';

const drawerWidth = 240;
export const MiniHeader_Component = () => {
  const [mobileOpen, setMobileOpen] = useState();
  const playlist = useRecoilValue(playlistState);
  const { data: session, status } = useSession();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };




  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "black",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon style={{ color: "white" }} />
        </IconButton>
        {/* {playlist?.name} */}
        <Button
          variant="text"
          size="small"
          sx={{
            color: "white",
            marginLeft: "auto",
            marginRight: 0,
            alignItems: "center",
            borderRadius: "45px",
            backgroundColor: "rgba(255,255,255,0.2)",
            height: "40px",
            padding: "0px",
            textOverflow: "ellipsis",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",

              borderRadius: "25px",
            }}
          >
            <div
              style={{
                padding: "5px",
              }}
            >
              <Avatar
                sx={{ width: 35, height: 35 }}
                alt="Remy Sharp"
                src={session?.user?.image}
              />
            </div>
            <div
              style={{
                padding: "5px",
                paddingRight: "10px",
              }}
            >
              {session?.user?.name}
            </div>
          </div>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
