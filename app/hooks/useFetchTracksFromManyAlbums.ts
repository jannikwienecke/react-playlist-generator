import { useClient } from "app/context/AppProvider"
import React from "react"
interface PropsFetchTracksFromManyAlbums {
  limit?: number
}

export const useFetchTracksFromManyAlbums = (options?: PropsFetchTracksFromManyAlbums) => {
  const client = useClient()

  const fetch = React.useCallback(
    async (albumIds: string[]) => {
      let tracks: SpotifyApi.TrackObjectSimplified[] = []
      console.log("albumIds === ", albumIds)

      await albumIds.forEach(async (albumId) => {
        console.log("albumId:", albumId)

        const url = `albums/${albumId}/tracks?limit=${options?.limit || 50}`
        const album: SpotifyApi.PagingObject<SpotifyApi.TrackObjectSimplified> = await client(url)
        console.log("return album = ", album)
        console.log("push items", album.items.length)

        tracks.push(...album.items)
      })

      console.log("return tracks...", tracks)

      return tracks
    },
    [client, options]
  )

  return fetch
}
