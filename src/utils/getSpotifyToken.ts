import axios from "axios";

const { SPOTIFY_TOKEN, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

interface SpotifyTokenResponse {
  access_token: string;
}

export default async function getSpotifyToken() {
  const tokenParams = `grant_type=refresh_token&refresh_token=${SPOTIFY_TOKEN}`;
  const tokenResponse = await axios.post<SpotifyTokenResponse>(
    `https://accounts.spotify.com/api/token?${tokenParams}`,
    null,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    }
  );

  return tokenResponse.data.access_token;
}