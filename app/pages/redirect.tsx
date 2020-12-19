import { useSpotifyToken } from "app/context/AppProvider"
import { Router } from "blitz"
import React from "react"

interface URL_PARAMETER_REDIRECT {
  access_token: string
  expires_in: string
  token_type: string
}
//The Redirect contains the token
const getHashFromSpotifyRedirectUrl = () => {
  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split("=")
        initial[parts[0]] = decodeURIComponent(parts[1])
      }
      return initial
    }, {})
  window.location.hash = ""
  return hash as URL_PARAMETER_REDIRECT
}

/**
 * This Page will be hit by the Spotify Server after the user has logged in
 */
const RedirectPage: React.FC = () => {
  const { setToken } = useSpotifyToken()
  React.useEffect(() => {
    const hashFromSpotifyRedirect = getHashFromSpotifyRedirectUrl()
    setToken(hashFromSpotifyRedirect.access_token)
    window.localStorage.setItem("spotifyToken", hashFromSpotifyRedirect.access_token)
    Router.push("/")
  }, [setToken])

  return <div>Loading...</div>
}

export default RedirectPage
