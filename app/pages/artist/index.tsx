import Layout from "app/layouts/Layout"
import { BlockProps } from "baseui/block"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import dynamic from "next/dynamic"
import React from "react"

const ArtistSearch = dynamic(() => import("app/components/ArtistSeach"), {
  ssr: false,
})
const SpotifyPlayer = dynamic(() => import("app/components/SpotifyPlayer"), {
  ssr: false,
})

const itemProps: BlockProps = {
  backgroundColor: "mono300",
  height: "scale2000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const Artist = () => {
  return (
    <div>
      <ArtistSearch searchType="artist">
        {(searchResults) => {
          console.log("searchResults", searchResults?.artists)
          return (
            // <div></div>
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
                        src={artist.images[0] && artist.images[0].url}
                        alt={artist.name}
                      />
                    </FlexGridItem>
                  ))}
              </FlexGrid>
            </>
          )
        }}
      </ArtistSearch>
      <SpotifyPlayer />
    </div>
  )
}

Artist.getLayout = (page) => <Layout title="Artist">{page}</Layout>

export default Artist
