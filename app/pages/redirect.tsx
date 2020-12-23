import { useSpotifyToken } from "app/context/AppProvider"
import {
  redirectUri,
  SPOTIFY_TOKEN_URL,
  URL_PARAMETER_REDIRECT,
  URL_PARAMETER_REDIRECT_CODE,
} from "app/spotifyConfig"
import { Router } from "blitz"
import React from "react"

/**
 * This Page will be hit by the Spotify Server after the user has logged in
 */
const RedirectPage: React.FC = () => {
  const { setToken, setRefreshToken } = useSpotifyToken()

  React.useEffect(() => {
    const state_and_code = getCodeAndStatefromUrl()
    fetchToken(state_and_code)
  }, [setToken, setRefreshToken])

  const getCodeAndStatefromUrl = () => {
    const search = window.location.search
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=")
          initial[parts[0]] = decodeURIComponent(parts[1])
        }
        return initial
      }, {})
    return search as URL_PARAMETER_REDIRECT_CODE
  }

  const fetchToken = async (state_and_code: URL_PARAMETER_REDIRECT_CODE) => {
    const token =
      "Basic " +
      btoa(
        `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
      )

    const body = `grant_type=authorization_code&code=${
      state_and_code.code
    }&redirect_uri=${encodeURIComponent(redirectUri)}`

    const headers = {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded",
    }

    const method = "POST"

    const response: URL_PARAMETER_REDIRECT = await fetch(SPOTIFY_TOKEN_URL, {
      body,
      headers,
      method,
    })
      .then((res) => res.json())
      .catch((err) => console.error("error fetching token...", err))

    setToken(response.access_token)
    setRefreshToken(response.refresh_token)
    redirectToHome()
  }

  const redirectToHome = () => {
    Router.push("/")
  }

  return <div>Loading...</div>
}

export default RedirectPage
