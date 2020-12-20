import Layout from "app/layouts/Layout"
import { useSearch } from "app/spotifyAPI/useSearch"
import React from "react"
import { Input } from "baseui/input"
import { BlitzPage } from "blitz"

interface Props {
  initialQuery?: string
}

const TestPage: BlitzPage<Props> = ({ initialQuery = "Justin" }) => {
  const { search, searchResults, query } = useSearch<"artist">({
    searchType: "artist",
    options: { initialQuery },
  })

  return (
    <>
      <label htmlFor="search">Search</label>
      <Input value={query} onChange={(event: any) => search(event.target.value)} />

      {!searchResults && <>loading</>}
      {searchResults?.artists.items.map((artist) => {
        return <li key={artist.id}>{artist.name}</li>
      })}
    </>
  )
}

TestPage.getLayout = (page) => <Layout title="Test Spotify">{page}</Layout>

export default TestPage
