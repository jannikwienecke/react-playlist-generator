import { useSpotify } from "./useSpotify"
import React from "react"

interface ArtistsAlbumsProps {
  artistId: string | undefined
  limit?: number
}

export const useArtistsAlbums = (
  { limit, artistId }: ArtistsAlbumsProps = { limit: 50, artistId: undefined }
) => {
  const [currentArtistId, setCurrentArtistId] = React.useState<string | undefined>()
  const url = `artists/${currentArtistId}/albums?limit=${limit}`

  type albumType = SpotifyApi.PagingObject<SpotifyApi.AlbumObjectFull>
  const { refetch, ...result } = useSpotify<albumType>({ url, enabled: false })

  React.useEffect(() => {
    console.log("artistId in album == ", artistId)

    if (artistId) {
      setCurrentArtistId(artistId)
    }
  }, [artistId])

  React.useEffect(() => {
    // ignore id of "_" - id is set to "_"
    //so that  when the user clicks on an artist - new songs are loaded from the artist
    if (currentArtistId && currentArtistId !== "_") {
      console.log("refetch.........")

      refetch()
    }
  }, [currentArtistId, refetch])

  return result
}
