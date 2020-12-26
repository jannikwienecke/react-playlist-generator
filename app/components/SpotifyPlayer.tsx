import { useSpotifyToken } from "app/context/AppProvider"
import { TrackPagingObject } from "app/hooks/useTopArtistsTracks"
import { SPOTIFY_PLAYER_NAME } from "app/spotifyConfig"
import { dynamic } from "blitz"
import React from "react"
import SpotifyWebPlayer from "react-spotify-web-playback"
import _ from "lodash"
import { useCurrentSong } from "../hooks/useCurrentSong"
const SpotifyPlayer: React.FC<{
  height: string
  defaultTrackList: TrackPagingObject | undefined
}> = ({ height, defaultTrackList }) => {
  const { token } = useSpotifyToken()
  const [play, setPlay] = React.useState(false)
  const [trackList, setTrackList] = React.useState<string[] | undefined>(undefined)

  React.useEffect(() => {
    setPlay(true)
    setTimeout(() => {
      setPlay(false)
    }, 500)
  }, [])

  React.useEffect(() => {
    const shuffledUris = _.shuffle(defaultTrackList?.items.map((track) => track.uri))
    setTrackList(shuffledUris)
  }, [defaultTrackList])

  return (
    <div>
      <SpotifyWebPlayer
        token={token}
        uris={trackList}
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
        name={SPOTIFY_PLAYER_NAME}
      />
    </div>
  )
}

export default dynamic(() => Promise.resolve(SpotifyPlayer), {
  ssr: false,
})
