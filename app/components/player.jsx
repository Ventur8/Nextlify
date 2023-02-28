"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import { Grid } from "@mui/material";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "@/atoms/currentTrackAtom";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import debounce from 'debounce';
const WallPaper = styled("div")({});

const Widget = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  padding: 16,

  width: "100%",
  maxWidth: "100%",
  margin: "auto",
  height: "13%",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 80,
  height: 80,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider() {
  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  const [volume, setVolume] = React.useState(50);
  const [muted, setMuted] = React.useState(false);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const { data: sessionStorage, status } = useSession();
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();
 
  const handlePause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const fetchCurrentSong = () => {
    spotifyApi.getAccessToken();
    if (!songInfo) {
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then((response) => {
          setCurrentTrackId(response.body?.item.id);

          spotifyApi.getMyCurrentPlaybackState().then((response) => {
            setIsPlaying(response.is_playing);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  const debouncedAdjustVolume = React.useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 500),
    []
  );
  React.useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [spotifyApi, currentTrackId]);

  return (
    <>
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Widget>
          <Grid container spacing={2}>
            {/* imagen e info de cancion */}
            <Grid item xl={2} md={2} xs={4}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CoverImage>
                  <img alt="" src={songInfo?.album.images?.[0]?.url} />
                </CoverImage>
                <Box sx={{ ml: 1.5, minWidth: 0 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={500}
                  >
                    {songInfo?.album.name}
                  </Typography>
                  <Typography noWrap>
                    <b>{songInfo?.name}</b>
                  </Typography>
                  <Typography noWrap letterSpacing={-0.25}>
                    {songInfo?.artists[0].name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* imagen e info de cancion final */}
            {/* slider de duracion y mas*/}
            <Grid item xl={8} md={8} xs={8}>
              {/* slider */}
              <Slider
                aria-label="time-indicator"
                size="small"
                value={position}
                min={0}
                step={1}
                max={duration}
                onChange={(_, value) => setPosition(value)}
                sx={{
                  color:
                    theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                  height: 4,
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                    "&:before": {
                      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: `0px 0px 0px 8px ${
                        theme.palette.mode === "dark"
                          ? "rgb(255 255 255 / 16%)"
                          : "rgb(0 0 0 / 16%)"
                      }`,
                    },
                    "&.Mui-active": {
                      width: 20,
                      height: 20,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
              {/* slider fin */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: -2,
                }}
              >
                <TinyText>{formatDuration(position)}</TinyText>
                <TinyText>-{formatDuration(duration - position)}</TinyText>
              </Box>
              {/* Botones play stop  */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: -1,
                }}
              >
                <IconButton
                  aria-label="previous song"
                  onClick={() => spotifyApi.skipToPrevious()}
                >
                  <FastRewindRounded
                    fontSize="large"
                    htmlColor={mainIconColor}
                  />
                </IconButton>
                <IconButton
                  aria-label={paused ? "play" : "pause"}
                  onClick={handlePause}
                >
                  {isPlaying ? (
                    <PauseRounded
                      sx={{ fontSize: "3rem" }}
                      htmlColor={mainIconColor}
                    />
                  ) : (
                    <PlayArrowRounded
                      sx={{ fontSize: "3rem" }}
                      htmlColor={mainIconColor}
                    />
                  )}
                </IconButton>
                <IconButton
                  aria-label="next song"
                  onClick={() => spotifyApi.skipToNext()}
                >
                  <FastForwardRounded
                    fontSize="large"
                    htmlColor={mainIconColor}
                  />
                </IconButton>
              </Box>
              {/* Botones play stop fin */}
            </Grid>
            <Grid item xl={2} md={2} sx={{ alignContent: "center" }}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1, px: 1 }}
                alignItems="center"
              >
                <VolumeDownRounded htmlColor={lightIconColor} />
                <Slider
                  aria-label="Volume"
                  defaultValue={50}
                  value={volume}
                  onChange={(_, value) => {
                    setVolume(value);
                    debouncedAdjustVolume(value);
                  }}

                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "#fff"
                        : "rgba(0,0,0,0.87)",
                    "& .MuiSlider-track": {
                      border: "none",
                    },
                    "& .MuiSlider-thumb": {
                      width: 24,
                      height: 24,
                      backgroundColor: "#fff",
                      "&:before": {
                        boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                      },
                      "&:hover, &.Mui-focusVisible, &.Mui-active": {
                        boxShadow: "none",
                      },
                    },
                  }}
                />
                <VolumeUpRounded htmlColor={lightIconColor} />
              </Stack>
            </Grid>
            {/* slider de duracion */}
          </Grid>
        </Widget>
        <WallPaper />
      </Box>
    </>
  );
}
