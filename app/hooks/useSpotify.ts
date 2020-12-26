import { useClient, useSpotifyToken } from "app/context/AppProvider"
import { useMutation, useQuery } from "react-query"
import { client } from "utils/utils"
import React from "react"
import { SPOTIFY_BASE_URL } from "app/spotifyConfig"

interface PropsSpotifyParameter {
  url: string
  data?: {} | undefined
  method?: "GET" | "POST" | "PUT"
  enabled?: boolean
}

export const useSpotify = <T>({ url, data, method, enabled = true }: PropsSpotifyParameter) => {
  const { token } = useSpotifyToken()
  const result = useQuery(
    [url, token?.slice(0, 20)],
    (): Promise<T> => {
      return client({ endpoint: url, token, data, method }).then((res: Promise<T>) => res)
    },
    { enabled }
  )
  return { ...result }
}

export const useSpotifyMutation = <T>({ url, method }: PropsSpotifyParameter) => {
  const { token } = useSpotifyToken()
  const result = useMutation(
    [url, token?.slice(0, 20)],
    (data: any): Promise<T> => {
      return client({ endpoint: url, token, data, method }).then((res: Promise<T>) => res)
    }
  )
  return { ...result }
}
