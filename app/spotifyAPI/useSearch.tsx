import { useClient } from "app/context/AppProvider"
import React from "react"
import { useQuery } from "react-query"

export type SearchType = "artist" | "track"

export type ReturnTypeSpotifyAPI<T> = T extends "artist"
  ? SpotifyApi.ArtistSearchResponse
  : T extends "track"
  ? SpotifyApi.TrackSearchResponse
  : never

interface PropsUseSearch {
  searchType: SearchType
  options?: {
    initialQuery?: string
  }
}

interface ReturnValue<T> {
  searchResults: ReturnTypeSpotifyAPI<T> | undefined
  search: (string) => void
  query: string
}

export function useSearch<T>({
  searchType,
  options = { initialQuery: "" },
}: PropsUseSearch): ReturnValue<T> {
  const { initialQuery } = options
  const [query, search] = React.useState(initialQuery ? initialQuery : "")
  const [hitAPI, setHitApi] = React.useState(false)
  const client = useClient()

  const { data, refetch } = useQuery(["search", { query }], () => {
    const url = `search?query=${initialQuery && !hitAPI ? initialQuery : query}&type=${searchType}`
    setHitApi(true)

    return client(url).then((data) => {
      return data
    })
  })

  React.useEffect(() => {
    refetch()
  }, [refetch])

  React.useEffect(() => {
    if (query) {
      refetch()
    }
  }, [query, refetch])

  return { searchResults: data, search, query }
}
