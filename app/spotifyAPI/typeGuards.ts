type SearchResponse = SpotifyApi.ArtistSearchResponse | SpotifyApi.TrackSearchResponse | []

export const isArtistResponse = (data: SearchResponse): data is SpotifyApi.ArtistSearchResponse => {
  const isArtist = (data as SpotifyApi.ArtistSearchResponse).artists !== undefined
  if (isArtist) return true
  else return false
}

export const isTrackResponse = (data: SearchResponse): data is SpotifyApi.TrackSearchResponse => {
  const isArtist = (data as SpotifyApi.TrackSearchResponse).tracks !== undefined
  if (isArtist) return true
  else return false
}
