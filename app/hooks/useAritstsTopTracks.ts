import { useSpotify } from "./useSpotify"
import React from "react"
import { COUNTRY_CODE } from "app/spotifyConfig"

export const useArtistsTopTracks = (id: string | undefined) => {
  const url = `artists/${id}/top-tracks?market=${COUNTRY_CODE}`

  type meType = SpotifyApi.ArtistsTopTracksResponse

  const { refetch, ...result } = useSpotify<meType>({ url, enabled: false })

  React.useEffect(() => {
    if (id) refetch()
  }, [refetch, id])

  return { ...result, data: result.data?.tracks, refetch }
}
