import artistSongList from "app/spotifyAPI/mocks/artists_{id}_top-tracks"
import top_artists from "app/spotifyAPI/mocks/me_top_artists"
import top_tracks from "app/spotifyAPI/mocks/me_top_tracks"
import { styled, useStyletron } from "baseui"
import { Button } from "baseui/button"
import { ArrowRight } from "baseui/icon"
import _ from "lodash"
import React from "react"

interface Props {
  play: (uris: string[]) => void
}
export const SideNavSuggestion: React.FC<Props> = ({ play }) => {
  const [css, theme] = useStyletron()
  const [nextTracks, setNextTracks] = React.useState<typeof top_tracks.items>()

  const shuffleAndSetNextTracks = () => {
    const threeRandomSongs = _.shuffle(top_tracks.items).slice(0, 3)
    setNextTracks(threeRandomSongs)
  }

  const getTracksByArtist = (artist_id) => {
    play(artistSongList.tracks.map((track) => track.uri))
  }

  const playTrack = (track) => {
    play([track])
  }

  React.useEffect(() => {
    shuffleAndSetNextTracks()
  }, [])

  return (
    <div>
      <div>
        <SideNavHeadingWrapper className={css({ color: "#fff" })}>
          <div
            className={css({
              alignItems: "center",
              color: theme.colors.white,
              display: "flex",
              paddingBottom: theme.sizing.scale500,
            })}
          >
            <div
              className={css({
                color: theme.colors.white,
                marginLeft: theme.sizing.scale200,
                fontSize: "1.2rem",
              })}
            >
              Recommendations Top Artists
            </div>
            <Button
              onClick={shuffleAndSetNextTracks}
              $style={{ marginLeft: "10px" }}
              kind="secondary"
              size="mini"
              shape="circle"
            >
              <ArrowRight size={36} title="next selection" />
            </Button>
          </div>
        </SideNavHeadingWrapper>
        <PreviewHolder>
          {_.shuffle(top_artists.items)
            .slice(0, 3)
            .map((artist) => {
              return (
                <NextSuggestionBox key={artist.id}>
                  <ImageHolder>
                    <Button
                      onClick={() => getTracksByArtist(artist.id)}
                      $style={{
                        borderRadius: "30%",
                        // background: theme.colors.primary600,
                        background: "rgba(84, 84, 84, 0.4)",
                        ":hover": {
                          background: "rgba(84, 84, 84, 0.9)",
                        },
                        padding: "6px",
                      }}
                      size="mini"
                    >
                      <PreviewImage src={artist.images[0].url} alt="preview suggestion" />
                    </Button>
                  </ImageHolder>
                  <PreviewText>{artist.name}</PreviewText>
                </NextSuggestionBox>
              )
            })}
        </PreviewHolder>
      </div>

      <div>
        <SideNavHeadingWrapper className={css({ color: "#fff" })}>
          <div
            className={css({
              alignItems: "center",
              color: theme.colors.white,
              display: "flex",
              paddingBottom: theme.sizing.scale500,
            })}
          >
            <div
              className={css({
                color: theme.colors.white,
                marginLeft: theme.sizing.scale200,
                fontSize: "1.2rem",
              })}
            >
              Recommendations Top Tracks
            </div>
            <Button
              onClick={shuffleAndSetNextTracks}
              $style={{ marginLeft: "10px" }}
              kind="secondary"
              size="mini"
              shape="circle"
            >
              <ArrowRight size={36} title="next selection" />
            </Button>
          </div>
        </SideNavHeadingWrapper>
        <PreviewHolder>
          {nextTracks?.map((track) => {
            return (
              <NextSuggestionBox key={track.id}>
                <ImageHolder>
                  <Button
                    onClick={() => playTrack(track.uri)}
                    $style={{ borderRadius: "30%", backgroundColor: theme.colors.primary700 }}
                    size="mini"
                    kind="secondary"
                  >
                    <PreviewImage src={track.album.images[0].url} alt="preview suggestion" />
                  </Button>
                </ImageHolder>
                <PreviewText>
                  {`${track.name}-${track.artists[0].name}`.length < 40
                    ? `${track.name}-${track.artists[0].name}`
                    : `${track.name}-${track.artists[0].name}`.slice(0, 40) + "..."}
                </PreviewText>
              </NextSuggestionBox>
            )
          })}
        </PreviewHolder>
      </div>
    </div>
  )
}

export const PreviewText = styled("p", ({ $theme }) => {
  return {
    fontSize: "0.9rem",
  }
})

export const PreviewHolder = styled("div", ({ $theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  }
})

export const SideNavHeadingWrapper = styled("div", ({ $theme }) => {
  return {
    margin: "8% 0% 0 5% ",
    fontFamily: $theme.typography.HeadingLarge.fontFamily,
  }
})

export const NextSuggestionBox = styled("div", ({ $theme }) => {
  return {
    margin: "20px 5px",
    width: "30%",
    textAlign: "center",
  }
})

export const ImageHolder = styled("div", ({ $theme }) => {
  return {}
})

export const PreviewImage = styled("img", ({ $theme }) => {
  return {
    verticalAlign: "middle",
    width: "100%",
    height: "100%",
    borderRadius: "30%",
    // border: "0px solid #30323F",
  }
})
