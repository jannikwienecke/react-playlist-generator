// import { useArtistsTopTracks } from "app/hooks/useAritstsTopTracks"
import create from "zustand"

const ARTIST = "artist"
const TRACK = "track"
type KindProp = typeof ARTIST | typeof TRACK

export type TrackType = SpotifyApi.TrackObjectFull[] | undefined
export type ArtistType = SpotifyApi.ArtistObjectFull[] | undefined

export type InputValueSetState<T> = T extends typeof ARTIST
  ? ArtistType
  : T extends typeof TRACK
  ? TrackType
  : never

export type StateRecommendationStore = {
  index: { [ARTIST]: 0; [TRACK]: 0 }
  increaseIndex: (by: KindProp) => void
  setState: <T extends KindProp>(by: T, value: InputValueSetState<T>) => void
  state: { [ARTIST]: ArtistType; [TRACK]: TrackType }
}

export const useStore = create<StateRecommendationStore>((set) => ({
  index: { artist: 0, track: 0 },
  state: { artist: undefined, track: undefined },
  increaseIndex: (by: KindProp) =>
    set((state) => ({ ...state, index: { ...state.index, [by]: state.index[by] + 1 } })),
  setState: (by, value) => {
    set((state_) => ({
      ...state_,
      state: {
        ...state_.state,
        [by]: value,
      },
    }))
  },
}))
