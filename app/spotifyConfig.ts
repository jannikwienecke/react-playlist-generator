const authEndpoint = "https://accounts.spotify.com/authorize"
const clientId = "10c586176d044f2b8c645706e96c1acd" //todo move to env.
const redirectUri = "http://localhost:3000/redirect"
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

export { SPOTIFY_AUTH_URL, SPOTIFY_BASE_URL }
