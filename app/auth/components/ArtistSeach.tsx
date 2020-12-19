import { useSpotifyToken } from "app/context/AppProvider"
import { BlockProps } from "baseui/block"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import { Heading, HeadingLevel } from "baseui/heading"
import { Input, SIZE } from "baseui/input"
import React from "react"
import { useQuery } from "react-query"
import { useStyletron } from "styletron-react"
import { client } from "utils/utils"

const itemProps: BlockProps = {
  backgroundColor: "mono300",
  height: "scale2000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

function useSearch({ searchType, ...options }: { searchType: string }) {
  const { token } = useSpotifyToken()
  const [query, setQuery] = React.useState("")
  const url = `search?query=${query}&type=artist`

  const { data, refetch } = useQuery(["search", { query }], () => {
    return client(url, token).then(
      (data): SpotifyApi.ArtistSearchResponse => {
        return data
      }
    )
  })

  React.useEffect(() => {
    if (query) {
      refetch()
    }
  }, [query, refetch])

  return { data: data?.artists, setQuery, query }
}

const ArtistSearch = () => {
  const [css] = useStyletron()

  const { data: artists, setQuery, query: artist } = useSearch({ searchType: "artist" })
  const handleInputChange = (event) => {
    if (event) {
      setQuery(event.target.value)
    }
  }

  return (
    <main>
      <div className={css({ width: "70%", margin: "0 auto" })}>
        <HeadingLevel>
          <Heading>Search Artist</Heading>
        </HeadingLevel>

        <Input
          value={artist}
          onChange={handleInputChange}
          size={SIZE.large}
          placeholder="Search Artist"
          clearOnEscape
        />
      </div>

      <FlexGrid flexGridColumnCount={2} flexGridColumnGap="scale800" flexGridRowGap="scale800">
        {artists?.items.length &&
          artists.items.map((artist) => (
            <FlexGridItem {...itemProps}>
              <img
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src={artist.images[0] && artist.images[0].url}
                alt={artist.name}
              />
            </FlexGridItem>
          ))}
      </FlexGrid>
    </main>
  )
}

export default ArtistSearch
