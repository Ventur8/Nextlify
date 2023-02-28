import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState } from "../../atoms/playlistAtom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import ListItemButton from "@mui/material/ListItemButton";
import { milisToMinutes } from "../../lib/milisToMinutes";
import { currentTrackIdState,isPlayingState } from "../../atoms/currentTrackAtom";
import useSpotify from "../hooks/useSpotify";
import {signIn, useSession} from "next-auth/react";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
    const order = 1
    const {data: session,status} = useSession();
    const spotifyApi = useSpotify()
    const[currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const[isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    
    const playTrack = (trackId,trackUri) => {
       
            setCurrentTrackId(trackId)
            setIsPlaying(true)
            spotifyApi.play({
                'token':session.accessToken,
                'uris':[trackUri]

                
            })
    }

  return (playlist?.tracks?.items?.map((item, index) => (
    // () => playTrack(item?.track.id,item?.track.uri)
    <List
      sx={{
        width: "100%",
        bgcolor: "black",
      }}
    >
      <ListItem
        alignItems="flex-start"
        sx={{ padding: 0 }}
        key={`${item?.track.id}`}
        onClick={() => playTrack(item?.track.id,item?.track.uri)}
      >
        <ListItemButton  dense>
            <p style={{padding: 10}}>{index +1 }</p>
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src={`${item?.track.album?.images[0]?.url}`}
              sx={{ borderRadius: 0 }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={item.track.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color=" rgb(255,255,255,0.5)"
                >
                  {item.track.artists[0].name}
                </Typography>
              </React.Fragment>
            }
        
          />
         <div style={{marginRight:100}}>{item.track.album.name} </div> 
         <div><p>{milisToMinutes(item.track.duration_ms)}</p></div>
          
        </ListItemButton>
      </ListItem>

      <Divider variant="inset" component="li" sx={{}} />
    </List>
  )));
};

export default Songs;
