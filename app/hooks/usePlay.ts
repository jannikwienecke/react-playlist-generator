import { useSpotifyMutation } from "./useSpotify"

// const useDeviceId = () => {
//   const url = "me/player/devices"
//   type devicesType = SpotifyApi.UserDevice

//   const result = useSpotify<devicesType>({ url })

//   return result
// }

export const usePlay = () => {
  const url = "me/player/play?device_id=20b54f69b425b515ea9f4a49075088ce6f69e5eb"
  const result = useSpotifyMutation<null>({ url, method: "PUT" })

  const play = (uris: string[]) => {
    result.mutate({ uris })
  }

  return { ...result, play }
}
