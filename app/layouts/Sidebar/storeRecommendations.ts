// import { useArtistsTopTracks } from "app/hooks/useAritstsTopTracks
import create from "zustand"
import { State, StateCreator } from "zustand"
import produce, { Draft } from "immer"

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

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api)

export const useStore = create<StateRecommendationStore>(
  immer((set) => ({
    index: { artist: 0, track: 0 },
    state: { artist: undefined, track: undefined },
    increaseIndex: (by) => set((state) => void (state.index[by] += 1)),
    setState: <T>(by, value: InputValueSetState<T>) =>
      set((state) => void (state.state[by] = value)),
  }))
)
