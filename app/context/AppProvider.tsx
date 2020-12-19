import React from "react"

interface SpotifyTokenContextProps {
  token: string
  setToken: (string) => void
}

const SpotifyTokenContext = React.createContext<SpotifyTokenContextProps | null>(null)

const useSpotifyToken = () => {
  const context = React.useContext(SpotifyTokenContext)
  if (context === undefined || context === null) {
    throw new Error(`useSpotifyToken must be used within a AppProvider (SpotifyTokenProvider)`)
  }
  return context
}

// function useClient() {
//   let { token } = useSpotifyToken()
//   console.log("token:", token)
//   return React.useCallback(
//     (endpoint, config) => {
//       console.log("run func...", token)

//       return client(endpoint, { ...config, token })
//     },
//     [token]
//   )
// }

export const SpotifyTokenProvider = (props) => {
  const [token, setToken] = React.useState<string>("")

  React.useEffect(() => {
    setToken(window.localStorage.getItem("spotifyToken") as string)
  }, [])

  const value = React.useMemo(() => ({ setToken, token }), [token])
  return (
    <SpotifyTokenContext.Provider value={value} {...props}>
      {props.children}
    </SpotifyTokenContext.Provider>
  )
}

// const queryConfig = {
//   queries: {
//     useErrorBoundary: true,
//     refetchOnWindowFocus: false,
//     retry(failureCount, error) {
//       if (error.status === 404) return false
//       else if (failureCount < 2) return true
//       else return false
//     },
//   },
// }

const AppProvider = ({ children }) => {
  return <SpotifyTokenProvider>{children}</SpotifyTokenProvider>
}

export { useSpotifyToken, AppProvider }
