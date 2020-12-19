import { useSpotifyToken } from "app/context/AppProvider"
import Layout from "app/layouts/Layout"
import { SPOTIFY_BASE_URL } from "app/spotify.config"
import { Heading, HeadingLevel } from "baseui/heading"
import { Input, SIZE } from "baseui/input"
import React from "react"
import { useQuery } from "react-query"
import { useStyletron } from "styletron-react"
import { client } from "utils/utils"
import dynamic from "next/dynamic"

const ArtistSearch = dynamic(() => import("app/auth/components/ArtistSeach"), {
  ssr: false,
})

export const Artist = () => {
  return (
    <div>
      <ArtistSearch />
    </div>
  )
}

Artist.getLayout = (page) => <Layout title="Artist">{page}</Layout>

export default Artist
