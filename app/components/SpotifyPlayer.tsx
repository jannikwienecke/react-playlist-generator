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
  const [currentPlaylist, setCurrentPlaylist] = React.useState<string[] | undefined>([
    "spotify:track:4EDeOi1xMFsO7MXMVHbuln",
  ])

  //after refactor - no statemangemnt locally but all state is handled over the spotify api

  React.useEffect(() => {
    // when setting one song - look up similar songs and add them to the playlist
    if (!currentSong) return
    setCurrentPlaylist([currentSong])
    setPlay(false)
    setTimeout(() => {
      setPlay(true)
    }, 50)
  }, [currentSong])

  React.useEffect(() => {
    if (!songList) return
    setCurrentPlaylist(songList.tracks.map((track) => track.uri))
    setPlay(false)
    setTimeout(() => {
      setPlay(true)
    }, 50)
  }, [songList])

  return (
    <div>
      <SpotifyWebPlayer
        token={token}
        uris={currentPlaylist}
        play={play}
        showSaveIcon={true}
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
        name="spotifyPlayerPlaylistBuilder"
      />
    </div>
  )
}

export default dynamic(() => Promise.resolve(SpotifyPlayer), {
  ssr: false,
})
