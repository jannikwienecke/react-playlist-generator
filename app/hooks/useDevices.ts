import { useSpotify } from "./useSpotify"
import React from "react"

export const useDevices = () => {
  const url = "me/player/devices"
  type devicesType = SpotifyApi.UserDevicesResponse
  const { refetch, ...result } = useSpotify<devicesType>({ url })

  React.useEffect(() => {
    window.setTimeout(() => {
      refetch()
    }, 2000)
  }, [refetch])

  return result
}
