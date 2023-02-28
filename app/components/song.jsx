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




const Song = ( {order,track}) => {
    const spotifyApi = useSpotify()
    const[currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const[isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

    const playTrack = () => {
       
        setCurrentTrackId(track.track.id)
        setIsPlaying(true)
        spotifyApi.play({
          
            uris:[track.track.uri]

            
        })
}

  return (
    <ListItem
        alignItems="flex-start"
        sx={{ padding: 0 }}
        key={`${item?.track.id}`}
        onClick={() => playTrack()}
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
            primary={track.track.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color=" rgb(255,255,255,0.5)"
                >
                  {track.track.artists[0].name}
                </Typography>
              </React.Fragment>
            }
        
          />
         <div style={{marginRight:100}}>{item.track.album.name} </div> 
         <div><p>{milisToMinutes(item.track.duration_ms)}</p></div>
          
        </ListItemButton>
        </ListItem>
  )
}

export default Song