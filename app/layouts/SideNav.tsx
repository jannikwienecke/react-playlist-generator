import { useStyletron } from "baseui"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import React from "react"
import { ProfileImage } from "./SideNavProfile"
import { SideNavSuggestion } from "./SideNavRecommendations"
import { SideNavSpotifyPlayer } from "./SideNavSpotifyPlayer"

export const SideNav = () => {
  const [css, theme] = useStyletron()
  const [currentSong, setCurrentSong] = React.useState("")
  const [songList, setSongList] = React.useState<SpotifyApi.ArtistsTopTracksResponse | undefined>(
    undefined
  )

  const gridStyles = css({
    height: "scale1000",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.white,
  })

  return (
    <FlexGrid flexDirection="column" height="100%">
      <FlexGridItem className={gridStyles}>
        <ProfileImage />
      </FlexGridItem>
      <FlexGridItem className={gridStyles}>
        <SideNavSuggestion setSongList={setSongList} setCurrentSong={setCurrentSong} />
      </FlexGridItem>
      <FlexGridItem height="15%" className={gridStyles}>
        <SideNavSpotifyPlayer songList={songList} currentSong={currentSong} />
      </FlexGridItem>
    </FlexGrid>
  )
}
