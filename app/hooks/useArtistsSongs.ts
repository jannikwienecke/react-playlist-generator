import React from "react"
import { useArtistsAlbums } from "./useArtitsAlbums"
import { useFetchTracksFromManyAlbums } from "./useFetchTracksFromManyAlbums"

interface ArtistsSongsProps {
  artistId: string | undefined
  limit?: number
}

export const useArtistsTracks = (
  { limit, artistId }: ArtistsSongsProps = { artistId: undefined, limit: 50 }
) => {
  const [artistsTracks, setartistsTracks] = React.useState<SpotifyApi.TrackObjectSimplified[]>()
  const { data: artistsAlbums } = useArtistsAlbums({ artistId, limit })
  const { fetch: fetchTracks, tracks } = useFetchTracksFromManyAlbums()

  const fetchAlbumTracks = React.useCallback(async () => {
    setartistsTracks(undefined)
    const albumIds = artistsAlbums?.items.map((album) => album.id)
    if (albumIds) {
      console.log("albumIds", albumIds)
      fetchTracks(albumIds)
    }
  }, [artistsAlbums, fetchTracks])

  React.useEffect(() => {
    if (artistsAlbums) {
      fetchAlbumTracks()
    }
  }, [artistsAlbums, fetchAlbumTracks])

  React.useEffect(() => {}, [artistId])

  return { tracks }
}
