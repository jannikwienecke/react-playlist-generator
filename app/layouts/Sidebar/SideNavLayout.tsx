import { useStyletron } from "baseui"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import React from "react"

export const SideNavLayout: React.FC = (props) => {
  const [css, theme] = useStyletron()
  // const [currentSong, setCurrentSong] = React.useState("")
  // const [songList, setSongList] = React.useState<SpotifyApi.ArtistsTopTracksResponse | undefined>(
  //   undefined
  // )

  const stylesLayoutGrid = css({
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.white,
  })

  return (
    <div className={css({ display: "flex", flexDirection: "column", height: "100%" })}>
      {React.Children.map(props.children, (child: any) => {
        return (
          <div
            className={css({
              flexBasis: "33%",
              maxHeight: "55%",
              justifyContent: "center",
              alignItems: "center",
              color: theme.colors.white,

              // display: "flex",
            })}
          >
            {React.cloneElement(child, props)}
          </div>
        )
      })}
    </div>
  )
}
