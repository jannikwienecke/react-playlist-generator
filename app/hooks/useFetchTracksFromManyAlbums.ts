import { useClient } from "app/context/AppProvider"
import React from "react"
interface PropsFetchTracksFromManyAlbums {
  limit?: number
}

export const useFetchTracksFromManyAlbums = (options?: PropsFetchTracksFromManyAlbums) => {
  const client = useClient()
  const [tracks, setTracks] = React.useState<SpotifyApi.TrackObjectSimplified[]>([])

  const fetch = React.useCallback(
    async (albumIds: string[]) => {
      console.log("albumIds === ", albumIds)

      const tracksPromise = await albumIds.map(async (albumId) => {
        console.log("albumId:", albumId)

        const url = `albums/${albumId}/tracks?limit=${options?.limit || 50}`
        const album: SpotifyApi.PagingObject<SpotifyApi.TrackObjectSimplified> = await client(url)
        console.log("return album = ", album)
        console.log("push items", album.items.length)

        setTracks([...tracks, ...album.items])
      })
    },
    [client, options]
  )

  return { fetch, tracks }
}
