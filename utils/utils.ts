import { SPOTIFY_BASE_URL } from "app/spotify.config"
import { QueryClient } from "react-query"

async function client(endpoint: string, token: string, queryClient: QueryClient, data = undefined) {
  console.log("data = ", data)

  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log("config", config)

  return window.fetch(`${SPOTIFY_BASE_URL}${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      queryClient.clear()
      window.location.assign("/")
      window.localStorage.setItem("spotifyToken", "")
      return Promise.reject({ message: "Please re-authenticate." })
    }

    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { client }
