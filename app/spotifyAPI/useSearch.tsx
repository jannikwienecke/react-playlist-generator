import { useClient } from "app/context/AppProvider"
import React from "react"
import { useQuery } from "react-query"

export type SearchType = "artist" | "track"

export type ReturnTypeSpotifyAPI<T> = T extends "artist"
  ? SpotifyApi.ArtistSearchResponse
  : T extends "track"
  ? SpotifyApi.TrackSearchResponse
  : never

export function useSearch<T>({
  searchType,
  ...options
}: {
  searchType: SearchType
}): {
  searchResults: ReturnTypeSpotifyAPI<T> | undefined
  search: (string) => void
  query: string
} {
  const [query, search] = React.useState("")
  const client = useClient()

  const { data, refetch } = useQuery(["search", { query }], () => {
    const url = `search?query=${query}&type=${searchType}`
    return client(url).then((data) => data)
  })

  React.useEffect(() => {
    if (query) {
      refetch()
    }
  }, [query, refetch])

  return { searchResults: data, search, query }
}
