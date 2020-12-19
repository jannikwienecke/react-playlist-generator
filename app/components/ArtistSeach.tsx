import { useSearch } from "app/spotifyAPI/useSearch"
import { Heading, HeadingLevel } from "baseui/heading"
import { Input, SIZE } from "baseui/input"
import React from "react"
import { useStyletron } from "styletron-react"
import { SearchType, ReturnTypeSpotifyAPI } from "app/spotifyAPI/useSearch"
interface SearchProps<T> {
  searchType: SearchType
  children: (searchResults: ReturnTypeSpotifyAPI<T> | undefined) => React.ReactNode
}

const ArtistSearch: React.FC<SearchProps> = ({ searchType, ...props }) => {
  const { searchResults, search, query: artist } = useSearch<typeof searchType>({ searchType })
  const [css] = useStyletron()
  const handleInputChange = (event) => {
    if (event) {
      search(event.target.value)
    }
  }

  return (
    <main>
      <div className={css({ width: "70%", margin: "0 auto" })}>
        <HeadingLevel>
          <Heading>Search</Heading>
        </HeadingLevel>
        <Input
          value={artist}
          onChange={handleInputChange}
          size={SIZE.large}
          placeholder="Search Artist"
          clearOnEscape
        />

        {props.children(searchResults)}
      </div>
    </main>
  )
}

export default ArtistSearch
