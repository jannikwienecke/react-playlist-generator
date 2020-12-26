import { COUNTRY_CODE } from "app/spotifyConfig"
import { useSpotify } from "./useSpotify"

export const useCurrentSong = () => {
  const url = `me/player/currently-playing?market=${COUNTRY_CODE}`
  type currentSongType = SpotifyApi.CurrentPlaybackResponse
  const result = useSpotify<currentSongType>({ url, refetchInterval: 3000 })

  return result
}
