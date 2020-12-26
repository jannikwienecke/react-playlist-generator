import { useSpotify } from "./useSpotify"
import React from "react"

interface AlbumTracksProps {
  limit?: number
}

export const useAlbumTracks = (options: AlbumTracksProps) => {
  const [albumId, setAlbumId] = React.useState<string | undefined>()

  const url = `albums/${albumId}/tracks?limit=${options.limit || 50}`

  type albumType = SpotifyApi.AlbumObjectFull
  const { refetch, ...result } = useSpotify<albumType>({ url, enabled: false })

  const fetchAlbumTracks = (albumId: string) => {
    setAlbumId(albumId)
  }

  React.useEffect(() => {
    if (albumId) refetch()
  }, [albumId, refetch])

  return { fetchAlbumTracks, ...result }
}
