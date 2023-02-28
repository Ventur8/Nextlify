import React, { useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import { Grid } from "@mui/material";
import Songs  from "./songs";
import { Button } from '@mui/material';
import SpotifyPlayer from 'react-spotify-web-playback';
import {signIn, useSession} from "next-auth/react";

export const MainBody = (props) => {
  const {data: session,status} = useSession();
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const playlistId = useRecoilValue(playlistIdState);
  const spotifyApi = useSpotify();
  spotifyApi.getAccessToken();
  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body);
    });
  }, [spotifyApi, playlistId]);
  



  return (
    <div style={{backgroundColor:'transparent',height:'1000px'}}>
      <Toolbar />
      {/* //armamos las paginas principales */}
      
      <div></div>
      <Grid container spacing={2} sx={{ }} >
        <Grid item xs={12} md={2}>
          <img
            style={{ height: 232, weight: 232 }}
            src={playlist?.images[0].url}
          ></img>
        </Grid>
        <Grid item xs={10} md={10}>
          <h1 style={{ fontSize: 55, fontWeight: 800 }}>{playlist?.name}</h1>
          <h4>{playlist?.description}</h4>
        </Grid>
        <Button onClick={()=>playTrack()}/>
        <Songs/>
      </Grid>
      
    </div>
  );
};
