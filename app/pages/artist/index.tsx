import ArtistSearch from "app/components/ArtistSeach"
import SpotifyPlayer from "app/components/SpotifyPlayer"
import Layout from "app/layouts/Layout"
import { BlockProps } from "baseui/block"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import React from "react"

const itemProps: BlockProps = {
  backgroundColor: "mono300",
  height: "scale2000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const Artist = ({ nextTheme, toggleTheme }) => {
  return (
    <div>
      <ArtistSearch searchType="artist">
        {(searchResults) => {
          return (
            <>
              <FlexGrid
                flexGridColumnCount={2}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800"
              >
                {searchResults &&
                  searchResults.artists.items.map((artist) => (
                    <FlexGridItem {...itemProps}>
                      <img
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                        src={artist.imags && artist.images.length > 0 ? artist.images[0].url : ""}
                        alt={artist.name}
                      />
                    </FlexGridItem>
                  ))}
              </FlexGrid>
            </>
          )
        }}
      </ArtistSearch>
    </div>
  )
}

Artist.getLayout = (page) => <Layout title="Artist">{page}</Layout>

export default Artist
