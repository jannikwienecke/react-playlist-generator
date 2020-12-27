import { useSpotifyToken } from "app/context/AppProvider"
import { TrackPagingObject } from "app/hooks/useTopArtistsTracks"
import { SPOTIFY_PLAYER_NAME } from "app/spotifyConfig"
import { dynamic } from "blitz"
import _ from "lodash"
import React from "react"
import SpotifyWebPlayer from "react-spotify-web-playback"
const SpotifyPlayer: React.FC<{
  height: string
  defaultTrackList: TrackPagingObject | undefined
}> = ({ height, defaultTrackList }) => {
  const { token } = useSpotifyToken()
  const [trackList, setTrackList] = React.useState<string[] | undefined>(undefined)

  React.useEffect(() => {
    const shuffledUris = _.shuffle(defaultTrackList?.items.map((track) => track.uri))
    setTrackList(shuffledUris)
  }, [defaultTrackList])

  return (
    <div>
      <SpotifyWebPlayer
        token={token}
        uris={trackList}
        play={false}
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
