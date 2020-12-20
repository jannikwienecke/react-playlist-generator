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
    <div className="container">
      <main>
        <h1>React - Playlist - Generator</h1>

        <Button onClick={redirectToSpotifyLogin} isLoading={false}>
          Login Spotify
        </Button>
      </main>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
