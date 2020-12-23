const authEndpoint = "https://accounts.spotify.com/authorize"
const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT
const redirectUri = "http://localhost:3002/redirect"
const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "streaming",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
]

const SPOTIFY_AUTH_URL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1/"

const COUNTRY_CODE = "ISO 3166-2:US"

export { SPOTIFY_AUTH_URL, SPOTIFY_BASE_URL, COUNTRY_CODE }
