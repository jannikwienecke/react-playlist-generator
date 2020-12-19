import { useSpotifyToken } from "app/context/AppProvider"
import Layout from "app/layouts/Layout"
import { Button } from "baseui/button"
import { BlitzPage, Link } from "blitz"
import React from "react"
import { SPOTIFY_AUTH_URL } from "../spotify.config"
import { StyledLink } from "baseui/link"
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
