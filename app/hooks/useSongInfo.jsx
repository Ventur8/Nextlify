import React, { useEffect, useState } from 'react'
import { currentTrackIdState,isPlayingState } from "../../atoms/currentTrackAtom";
import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import { useRecoilState } from 'recoil';

function useSongInfo()  {


  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const[currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const{ data:sessionStorage,status} = useSession();
  const spotifyApi = useSpotify();
  const [songInfo, setSongInfo] = useState(null);


  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            }
          }
        ).then((res) => res.json());
        setSongInfo(trackInfo);
       
      }
    };

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);


  return (
    songInfo
    
  )
}

export default useSongInfo