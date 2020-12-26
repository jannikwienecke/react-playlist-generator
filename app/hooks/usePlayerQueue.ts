import { useSpotifyMutation } from "./useSpotify"
import React from "react"

export const usePlay = () => {
  const url = `me/player/queue`
  const { mutate, ...result } = useSpotifyMutation<null>({ url, method: "POST" })

  const addSongsToQueue = () => {
    mutate({})
  }
  return { result, addSongsToQueue }
}
