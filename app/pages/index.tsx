import Layout from "app/layouts/Layout"
import { SPOTIFY_AUTH_URL } from "app/spotifyConfig"
import { Button } from "baseui/button"
import { BlitzPage } from "blitz"
import React from "react"
const Home: BlitzPage = () => {
  const redirectToSpotifyLogin = () => {
    window.location.assign(SPOTIFY_AUTH_URL)
  }

  return (
    <main>
      <h1>React - Playlist - Generator</h1>

      <Button onClick={redirectToSpotifyLogin} isLoading={false}>
        Login Spotify
      </Button>
    </main>
  )
}

Home.getLayout = (page) => <Layout title="  ">{page}</Layout>

export default Home
