import { useSpotifyToken } from "app/context/AppProvider"
import { dynamic } from "blitz"
import React from "react"
import SpotifyWebPlayer from "react-spotify-web-playback"

const SpotifyPlayer: React.FC<{
  height: string
  currentSong: string
  songList: SpotifyApi.ArtistsTopTracksResponse | undefined
}> = ({ height, currentSong, songList }) => {
  const { token } = useSpotifyToken()
  const [play, setPlay] = React.useState(false)
  const [currentPlaylist, setCurrentPlaylist] = React.useState<string[]>([""])

  //after refactor - no statemangemnt locally but all state is handled over the spotify api

  React.useEffect(() => {
    // when setting one song - look up similar songs and add them to the playlist

    setCurrentPlaylist([currentSong])
    setTimeout(() => {
      setPlay(false)
    }, 50)
    setPlay(true)
  }, [currentSong])

  React.useEffect(() => {
    setCurrentPlaylist(songList ? songList.tracks.map((track) => track.uri) : [""])
    setTimeout(() => {
      setPlay(false)
    }, 50)
    setPlay(true)
  }, [songList])

  return (
    <div>
      <SpotifyWebPlayer
        token={token}
        uris={currentPlaylist}
        play={play}
        showSaveIcon={true}
        autoPlay
        styles={{
          activeColor: "#fff",
          bgColor: "transparent",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1cb954",
          trackArtistColor: "transparent",
          trackNameColor: "transparent",
          height: height,
        }}
      />
    </div>
  )
}

export default dynamic(() => Promise.resolve(SpotifyPlayer), {
  ssr: false,
})
