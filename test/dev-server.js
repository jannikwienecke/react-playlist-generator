import { setupWorker } from "msw"
import { SPOTIFY_BASE_URL } from "../app/spotifyConfig"
import { handlers } from "./server-handlers"

const server = setupWorker(...handlers)

server.start({
  quiet: true,
  serviceWorker: {
    url: SPOTIFY_BASE_URL + "mockServiceWorker.js",
  },
})

export * from "msw"
export { server }
