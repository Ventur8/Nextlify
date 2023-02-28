'use client';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { Button } from '@mui/material';
import { signOut} from "next-auth/react";
import Search_component from './search';


export const Headerlogeado_component = ()=>{
 
  return (
    <header>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  style={{ background: "#DBA800" }}>
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            style={{color: "black"}}
          >
           Nextly
          </Typography >
          <ul ><Button ><Link  style={{color:'black',textDecoration:'none',paddingTop:'15px'}} href='/'>Home</Link></Button>
          <Button onClick={() => signOut()}><Link  style={{color:'black',textDecoration:'none',paddingTop:'15px'}} href='/'>Log out</Link></Button></ul>
          <Search_component/>
        </Toolbar>
      </AppBar>
    </Box>
      </header>
  )
}