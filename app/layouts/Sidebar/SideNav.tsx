import { usePlay } from "app/hooks/usePlay"
import { useStyletron } from "baseui"
import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { SideNavSuggestion } from "../SideNavRecommendations"
import ProfileImage from "./ProfileImage"
import { SideNavLayout } from "./SideNavLayout"
import SpotifyPlayer from "./SideNavSpotifyPlayer"
import { SideSkeleton } from "./SideSkeleton"
import useProfileImage from "./useProfileImage"

const Wrapper = ({ children }) => {
  const [css] = useStyletron()
  return <div className={css({ textAlign: "center", margin: "10px" })}>={children}</div>
}
export const SideNav = () => {
  const { profileName, profileImageUrl } = useProfileImage()
  const { play, data } = usePlay()
  // const {} = useRecommendations()
  // const {} = useSpotiifyPlayer()

  if (!profileImageUrl) return <SideSkeleton />
  return (
    <SideNavLayout>
      <ProfileImage profileImageUrl={profileImageUrl} profileName={profileName} />
      <SideNavSuggestion play={play} />
      <SpotifyPlayer currentSong="" songList={undefined} />
    </SideNavLayout>
  )
}
