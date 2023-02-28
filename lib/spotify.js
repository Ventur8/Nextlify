import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-top-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-follow-read',
    'user-follow-modify',
    'user-library-read',
    'user-read-playback-position',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-modify-playback-state',
    'user-read-recently-played',
    'user-top-read',
    'app-remote-control',
    'streaming',
    'user-read-email',
].join(',');

const params = {
    scope: scopes,
}

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
    // redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export default spotifyApi;
export {LOGIN_URL};
