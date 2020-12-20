import Layout from "app/layouts/Layout"
import { BlockProps } from "baseui/block"
import { FlexGrid, FlexGridItem } from "baseui/flex-grid"
import dynamic from "next/dynamic"
import React from "react"

const ArtistSearch = dynamic(() => import("app/components/ArtistSeach"), {
  ssr: false,
})

const itemProps: BlockProps = {
  backgroundColor: "mono300",
  height: "scale2000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const Track = () => {
  return (
    <div>
      <ArtistSearch searchType="track">
        {(searchResults) => {
          console.log("searchResult == ", searchResults && searchResults.tracks.items[0].href)

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
  )
}

Track.getLayout = (page) => <Layout title="Track">{page}</Layout>

export default Track
