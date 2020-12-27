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

      const promises: Promise<SpotifyApi.PagingObject<SpotifyApi.TrackObjectSimplified>>[] = []

      albumIds.map(async (albumId) => {
        console.log("albumId:", albumId)

        const url = `albums/${albumId}/tracks?limit=${options?.limit || 50}`

        promises.push(client(url))
      })

      const albumList = await Promise.all(promises)
      const trackList: SpotifyApi.TrackObjectSimplified[] = []
      albumList.forEach((album) => trackList.push(...album.items))

      console.log("trackList========", trackList)

      setTracks(trackList)
    },
    [client, options]
  )

  return { fetch, tracks }
}
