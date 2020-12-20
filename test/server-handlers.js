import { rest } from "msw"
import { SPOTIFY_BASE_URL } from "../app/spotifyConfig"

const handlers = [
  rest.post(`${SPOTIFY_BASE_URL}/testing/`, async (req, res, ctx) => {
    console.log("handle /testing...")
  }),
]
const getToken = (req) => req.headers.get("Authorization")?.replace("Bearer ", "")

export { handlers }
