import { SPOTIFY_TOKEN_URL, URL_PARAMETER_REDIRECT } from "app/spotifyConfig"
import React from "react"
import { client } from "utils/utils"
interface SpotifyTokenContextProps {
  token: string
  setToken: (string) => void
  setRefreshToken: (string) => void
}
type QueryConfig = {
  data?: {}
  method?: string
}

const SpotifyTokenContext = React.createContext<SpotifyTokenContextProps | null>(null)

const useSpotifyToken = () => {
  const context = React.useContext(SpotifyTokenContext)
  if (context === undefined || context === null) {
    throw new Error(`useSpotifyToken must be used within a AppProvider (SpotifyTokenProvider)`)
  }
  return context
}

function useClient() {
  let { token } = useSpotifyToken()

  return React.useCallback(
    (endpoint, config: QueryConfig | undefined = undefined) => {
      return client({ endpoint, token })
    },
    [token]
  )
}

export const SpotifyTokenProvider = (props) => {
  const [token, setToken_] = React.useState<string>("")
  const [refreshToken, setRefreshToken_] = React.useState<string>("")

  const setRefreshToken = React.useCallback((token: string) => {
    if (!token) return
    window.localStorage.setItem("spotifyRefreshToken", token)
    setRefreshToken_(token)
  }, [])

  const startTimerRefreshToken = React.useCallback(() => {
    setTimeout(() => {
      refetchToken()
    }, 1000 * 55)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setToken = React.useCallback(
    (token: string) => {
      if (!token) return
      window.localStorage.setItem("spotifyToken", token)
      setToken_(token)
      startTimerRefreshToken()
    },
    [startTimerRefreshToken]
  )

  const refetchToken = React.useCallback(async () => {
    const token =
      "Basic " +
      btoa(
        `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
      )

    const refreshToken_ = window.localStorage.getItem("spotifyRefreshToken")
    const body = `grant_type=refresh_token&refresh_token=${refreshToken_}`

    const headers = {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded",
    }

    const response: URL_PARAMETER_REDIRECT = await fetch(SPOTIFY_TOKEN_URL, {
      body,
      headers,
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => console.error("error fetching token...", err))
    setToken(response.access_token)
  }, [setToken])

  React.useEffect(() => {
    setToken_(window.localStorage.getItem("spotifyToken") as string)
    setRefreshToken_(window.localStorage.getItem("spotifyRefreshToken") as string)
  }, [setToken, setRefreshToken])

  const value = React.useMemo(() => ({ setToken, token, setRefreshToken, refreshToken }), [
    token,
    refreshToken,
    setRefreshToken,
    setToken,
  ])
  return (
    <SpotifyTokenContext.Provider value={value} {...props}>
      {props.children}
    </SpotifyTokenContext.Provider>
  )
}

const AppProvider = ({ children }) => {
  return <SpotifyTokenProvider>{children}</SpotifyTokenProvider>
}

export { useSpotifyToken, AppProvider, useClient }
