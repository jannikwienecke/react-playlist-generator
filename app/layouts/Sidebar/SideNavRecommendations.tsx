import { ImageButton } from "app/components/ImageButton"
import { motion, useAnimation } from "framer-motion"

import { NextItemButton } from "app/components/NextItemButton"
import { useStyletron } from "baseui"
import React from "react"
import { StateRecommendationStore } from "./storeRecommendations"
import {
  ImageHolder,
  NextSuggestionBox,
  PreviewHolder,
  PreviewImage,
  PreviewText,
  SideNavHeadingWrapper,
} from "./styles"

interface Props {
  playSong: (uris: string) => void
  topArtists: SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull> | undefined
  topTracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined
  playArtistSongs: (string) => void
  recommendationStore: StateRecommendationStore
}
export const SideNavSuggestion: React.FC<Props> = ({
  playArtistSongs,
  topTracks,
  topArtists,
  playSong,
  recommendationStore: { increaseIndex, setState, state: store, index },
}) => {
  const [css, theme] = useStyletron()

  const [currentSongIndex, setcurrentSongIndex] = React.useState<string | undefined>(undefined)
  const [currentArtistIndex, setCurrentArtistIndex] = React.useState<string | undefined>(undefined)

  const stylesHeader = css({
    alignItems: "center",
    color: theme.colors.white,
    display: "flex",
    paddingBottom: theme.sizing.scale500,
  })

  const stylesHeadline = css({
    color: theme.colors.white,
    marginLeft: theme.sizing.scale200,
    fontSize: "1.2rem",
  })

  const SideNavArtistItem = (
    <div>
      <SideNavHeadingWrapper>
        <div className={stylesHeader}>
          <div className={stylesHeadline}>Recommendations Top Artists</div>
          <NextItemButton onClick={() => increaseIndex("artist")} />
        </div>
      </SideNavHeadingWrapper>

      <PreviewHolder>
        {store.artist?.slice(index.artist, index.artist + 10).map((artist, index) => {
          console.log("artist", artist)
          return (
            <motion.div
              className={css({ margin: "20px 5px", width: "30%", textAlign: "center" })}
              transition={{ duration: 1 }}
              key={artist.id}
              style={index >= 3 ? { display: "none" } : {}}
              animate={{
                scale: index >= 3 ? 0.9 : 1,
                opacity: index >= 0 && index <= 2 ? 1 : 0.6,
              }}
            >
              <NextSuggestionBox key={artist.id}>
                <ImageHolder>
                  <ImageButton
                    active={artist.id === currentArtistIndex}
                    onClick={() => {
                      setCurrentArtistIndex(artist.id)
                      playArtistSongs(artist.id)
                      setcurrentSongIndex(undefined)
                    }}
                  >
                    <PreviewImage
                      src={artist.images.length > 0 ? artist.images[0].url : '"/logo.png"'}
                      alt="preview suggestion"
                    />
                  </ImageButton>
                </ImageHolder>
                <PreviewText>{artist.name}</PreviewText>
              </NextSuggestionBox>
            </motion.div>
          )
        })}
      </PreviewHolder>
    </div>
  )

  const SideNavTrackItem = (
    <div>
      <SideNavHeadingWrapper>
        <div className={stylesHeader}>
          <div className={stylesHeadline}>Recommendations Top Tracks</div>
          <NextItemButton onClick={() => increaseIndex("track")} />
        </div>
      </SideNavHeadingWrapper>

      <PreviewHolder>
        {store.track?.slice(index.track, index.track + 10).map((track, index) => {
          console.log("track", track)
          return (
            <motion.div
              className={css({ margin: "20px 5px", width: "30%", textAlign: "center" })}
              transition={{ duration: 1 }}
              key={track.id}
              style={index >= 3 ? { display: "none" } : {}}
            >
              <NextSuggestionBox key={track.id}>
                <ImageHolder>
                  <ImageButton
                    active={track.id === currentSongIndex}
                    onClick={() => {
                      playSong(track.uri)
                      setcurrentSongIndex(track.id)
                      setCurrentArtistIndex(undefined)
                    }}
                  >
                    <PreviewImage
                      src={track.album.images.length > 0 ? track.album.images[0].url : "/logo.png"}
                      alt="preview suggestion"
                    />
                  </ImageButton>
                </ImageHolder>
                <PreviewText>
                  {`${track.name}-${track.artists[0].name}`.length < 40
                    ? `${track.name}-${track.artists[0].name}`
                    : `${track.name}-${track.artists[0].name}`.slice(0, 35) + "..."}
                </PreviewText>
              </NextSuggestionBox>
            </motion.div>
          )
        })}
      </PreviewHolder>
    </div>
  )

  return (
    <div>
      {SideNavArtistItem}
      {SideNavTrackItem}
    </div>
  )
}
