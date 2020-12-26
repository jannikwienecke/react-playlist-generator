import { usePlay } from "app/hooks/usePlay"
import React from "react"
import { SideNavSuggestion } from "../SideNavRecommendations"
import ProfileImage from "./ProfileImage"
import { SideNavLayout } from "./SideNavLayout"
import SpotifyPlayer from "./SideNavSpotifyPlayer"
import { SideSkeleton } from "./SideSkeleton"
import useProfileImage from "./useProfileImage"
import { useRecommendations } from "./useRecommendations"

export const SideNav = () => {
  const { profileName, profileImageUrl } = useProfileImage()
  const {
    topArtists,
    topTracks,
    playArtistSongs,
    store: recommendationStore,
  } = useRecommendations()
  const { play } = usePlay()

  if (!profileImageUrl || !topTracks || !topArtists) return <SideSkeleton />

  return (
    <SideNavLayout>
      <ProfileImage profileImageUrl={profileImageUrl} profileName={profileName} />
      <SideNavSuggestion
        play={play}
        topTracks={topTracks}
        topArtists={topArtists}
        playArtistSongs={playArtistSongs}
        recommendationStore={recommendationStore}
      />
      <SpotifyPlayer defaultTrackList={topTracks} />
    </SideNavLayout>
  )
}
