import { useStyletron } from "baseui"
import React from "react"
import SpotifyPlayer from "app/components/SpotifyPlayer"
import { HeadingXSmall } from "baseui/typography"
import { TrackPagingObject } from "app/hooks/useTopArtistsTracks"
import { useCurrentSong } from "app/hooks/useCurrentSong"

const Player: React.FC<{
  defaultTrackList: TrackPagingObject
}> = (props) => {
  const [css] = useStyletron()
  const { data: currentPlayback, refetch: fetchCurrentSong } = useCurrentSong()

  const startFetchCurrentSongIntervall = () => {
    fetchCurrentSong()
    let intervall = setInterval(() => {
      fetchCurrentSong()
    }, 100)

    setTimeout(() => {
      clearInterval(intervall)
    }, 500)
  }

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "flex-end",
        paddingLeft: "10px",
      })}
    >
      <div>
        <div>
          <HeadingXSmall color="#fff" margin="10px">
            {currentPlayback?.item?.artists[0].name} - {currentPlayback?.item?.name}
          </HeadingXSmall>
        </div>
        <div className={css({ background: "#282B3A", padding: "20px", borderRadius: "20px" })}>
          <div
            role="button"
            tabIndex={0}
            onClick={startFetchCurrentSongIntervall}
            onKeyDown={startFetchCurrentSongIntervall}
          >
            <SpotifyPlayer {...props} height="80px" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
