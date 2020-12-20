import { useSpotifyToken } from "app/context/AppProvider"
import React from "react"
import SpotifyWebPlayer from "react-spotify-web-playback"

const SpotifyPlayer = () => {
  const { token } = useSpotifyToken()

  return (
    <div>
      <SpotifyWebPlayer
        token={token}
        uris={["spotify:track:4y4spB9m0Q6026KfkAvy9Q"]}
        styles={{
          activeColor: "#fff",
          bgColor: "#333",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: "200px",
        }}
      />
    </div>
  )
}

export default SpotifyPlayer
