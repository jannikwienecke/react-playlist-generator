import { useStyletron } from "baseui"
import React from "react"
import SpotifyPlayer from "app/components/SpotifyPlayer"
import { HeadingXSmall } from "baseui/typography"

const API_ARTIST = "Justin Bieber"
const API_SONG = "Lonely"

interface Props {
  currentSong: string
  songList: SpotifyApi.ArtistsTopTracksResponse | undefined
}
const Player: React.FC<Props> = (props) => {
  const [css] = useStyletron()
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
            {API_ARTIST} - {API_SONG}
          </HeadingXSmall>
        </div>
        <div className={css({ background: "#282B3A", padding: "20px", borderRadius: "20px" })}>
          <SpotifyPlayer {...props} height="80px" />
        </div>
      </div>
    </div>
  )
}

export default Player
