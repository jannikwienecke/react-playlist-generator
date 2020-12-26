import { SPOTIFY_PLAYER_NAME } from "app/spotifyConfig"
import { useDevices } from "./useDevices"
import { useSpotifyMutation } from "./useSpotify"
import React from "react"
import _ from "lodash"
import { TrackPagingObject } from "./useTopArtistsTracks"

export const usePlay = () => {
  const resultDevices = useDevices()
  const [deviceId, setDeviceId] = React.useState<string | undefined>()
  const [uris, setUris] = React.useState<string[] | undefined>()

  const url = `me/player/play?device_id=${deviceId}`
  const { mutate, error, ...result } = useSpotifyMutation<null>({ url, method: "PUT" })

  React.useEffect(() => {
    if (deviceId && uris) {
      mutate({ uris })
    }
  }, [deviceId, mutate, uris])

  const play = React.useCallback(
    (uris: string[]) => {
      const resultDeviceId = resultDevices.data?.devices.find(
        (device) => device.name === SPOTIFY_PLAYER_NAME
      )

      setDeviceId(resultDeviceId && resultDeviceId.id ? resultDeviceId.id : undefined)

      setUris(uris)
    },
    [resultDevices.data?.devices]
  )

  React.useEffect(() => {
    let err: any = error
    if (err && err?.error?.reason === "UNKNOWN") {
      mutate(uris)
    }
  }, [error])

  return { ...result, play }
}
