import { Box } from "app/components/baseComponents/Box"
import Layout from "app/layouts/Layout"
import { useSearch } from "app/spotifyAPI/useSearch"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import { Input } from "baseui/input"
import { Theme } from "baseui/theme"
import { DisplayLarge } from "baseui/typography"
import { BlitzPage } from "blitz"
import React from "react"

interface Props {
  initialQuery?: string
  nextTheme: string
  toggleTheme: () => void
}

const TestPage: BlitzPage<Props> = ({ nextTheme, toggleTheme, initialQuery = "Justin" }) => {
  const { search, searchResults, query } = useSearch<"artist">({
    searchType: "artist",
    options: { initialQuery },
  })

  const [_, theme] = useStyletron()
  return (
    <>
      <button onClick={toggleTheme}>Switch Theme</button>
      <Box>
        <div>nextTheme Theme : {nextTheme}</div>
      </Box>
      <Block color={theme.colors.accent} margin="100px">
        <DisplayLarge>Helo</DisplayLarge>
      </Block>
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
