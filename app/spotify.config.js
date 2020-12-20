export const authEndpoint = "https://accounts.spotify.com/authorize"
export const clientId = "10c586176d044f2b8c645706e96c1acd" //todo move to env.
export const redirectUri = "http://localhost:3000/redirect"
export const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
  "streaming",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
]

export const SPOTIFY_AUTH_URL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`

export const SPOTIFY_BASE_URL = "https://api.spotify.com/v1/"
