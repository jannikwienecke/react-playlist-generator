// import { useArtistsTopTracks } from "app/hooks/useAritstsTopTracks"
import { useArtistsTracks } from "app/hooks/useArtistsSongs"
import { useCurrentSong } from "app/hooks/useCurrentSong"
import { usePlay } from "app/hooks/usePlay"
import { useTopArtistsTracks } from "app/hooks/useTopArtistsTracks"
import _ from "lodash"
import React from "react"
import { useStore } from "./storeRecommendations"

export const useRecommendations = () => {
  const store = useStore(React.useCallback((state) => state, []))
  const [artistId, setArtistId] = React.useState<string | undefined>()
  const { topArtists, topTracks } = useTopArtistsTracks()
  const { tracks: artistsTracks } = useArtistsTracks({ artistId, limit: 50 })
  const { play } = usePlay()
  const { refetch: refetchCurrentSong } = useCurrentSong()

  React.useEffect(() => {
    store.setState("track", _.shuffle(topTracks?.items))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topTracks])

  React.useEffect(() => {
    store.setState("artist", _.shuffle(topArtists?.items))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topArtists])

  // React.useEffect(() => {
  //   if (artistsTopTracks) play(artistsTopTracks.map((track) => track.uri))
  // }, [artistsTopTracks, play])

  // after a new so
  const playWrapper = React.useCallback(
    (uris: string[]) => {
      play(uris)
      let intervall = setInterval(() => {
        refetchCurrentSong()
      }, 100)

      setTimeout(() => {
        clearInterval(intervall)
      }, 1000)
    },
    [play, refetchCurrentSong]
  )

  React.useEffect(() => {
    if (artistsTracks && artistsTracks?.length > 0) {
      console.log("artistsTracks", artistsTracks)
      const selectedArtistsTracks = _.shuffle(artistsTracks.slice(0, 100))
      console.log("selectedArtistsTracks", selectedArtistsTracks)
      const uris = selectedArtistsTracks.map((track) => track.uri)
      console.log("uris", uris.length)
      playWrapper(uris)
    }
  }, [artistsTracks, playWrapper])

  const playArtistSongs = React.useCallback(
    (artistId_: string) => {
      // SET ARTIST ID TO "_" - allows for refetching the artistssongs everytime the user
      // clicks on the artist button
      if (artistId) setArtistId("_")
      setTimeout(() => {
        setArtistId(artistId_)
      }, 30)
    },
    [artistId]
  )

  const playSong = React.useCallback(
    (uri: string) => {
      playWrapper([uri])
    },
    [playWrapper]
  )

  return {
    topArtists,
    topTracks,
    // artistsTopTracks,
    playArtistSongs,
    playSong,
    store,
  }
}
