import { SPOTIFY_BASE_URL } from "app/spotify.config"

async function client(endpoint: string, token: string, data: {} | undefined = undefined) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return window.fetch(`${SPOTIFY_BASE_URL}${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      // queryClient.clear() // need to be wrappend in react-query privider but becuase of ssr didnt work
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
