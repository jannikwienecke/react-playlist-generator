// import { useArtistsTopTracks } from "app/hooks/useAritstsTopTracks"
import { useArtistsTracks } from "app/hooks/useArtistsSongs"
import { usePlay } from "app/hooks/usePlay"
import { useTopArtistsTracks } from "app/hooks/useTopArtistsTracks"
import _ from "lodash"
import React from "react"
import { useStore } from "./storeRecommendations"

export const useRecommendations = () => {
  const store = useStore(React.useCallback((state) => state, []))
  const [artistId, setArtistId] = React.useState<string | undefined>()
  const { topArtists, topTracks } = useTopArtistsTracks()
  const { artistsTracks } = useArtistsTracks({ artistId, limit: 50 })
  const { play } = usePlay()

  React.useEffect(() => {
    store.setState("track", _.shuffle(topTracks?.items))
  }, [topTracks])

  React.useEffect(() => {
    store.setState("artist", _.shuffle(topArtists?.items))
  }, [topArtists])

  // React.useEffect(() => {
  //   if (artistsTopTracks) play(artistsTopTracks.map((track) => track.uri))
  // }, [artistsTopTracks, play])

  React.useEffect(() => {
    if (artistsTracks) {
      play(_.shuffle(artistsTracks.slice(0, 100).map((track) => track.uri)))
    }
  }, [artistsTracks, play])

  const playArtistSongs = (artistId_: string) => {
    // SET ARTIST ID TO "_" - allows for refetching the artistssongs everytime the user
    // clicks on the artist button
    if (artistId) setArtistId("_")
    setTimeout(() => {
      setArtistId(artistId_)
    }, 50)
  }

  return {
    topArtists,
    topTracks,
    // artistsTopTracks,
    playArtistSongs,
    store,
  }
}
