import ArtistSearch from "app/components/ArtistSeach"
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

export const Track = () => {
  return (
    <main>
      <div>
        <ArtistSearch searchType="track">
          {(searchResults) => {
            return (
              <>
                <FlexGrid
                  flexGridColumnCount={2}
                  flexGridColumnGap="scale800"
                  flexGridRowGap="scale800"
                >
                  {searchResults &&
                    searchResults.tracks.items.map((track) => {
                      console.log("track", track)
                      return <FlexGridItem {...itemProps}>{track.name}</FlexGridItem>
                    })}
                </FlexGrid>
              </>
            )
          }}
        </ArtistSearch>
      </div>
    </main>
  )
}

Track.getLayout = (page) => <Layout title="Track">{page}</Layout>

export default Track
