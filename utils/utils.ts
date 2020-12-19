import { SPOTIFY_BASE_URL } from "app/spotify.config"

async function client(endpoint: string, token: string) {
  const config = {
    // method: data ? "POST" : "GET",
    // body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": data ? "application/json" : undefined,
      // ...customHeaders,
    },
    // ...customConfig,
  }

  console.log("fetching...", endpoint)

  return window.fetch(`${SPOTIFY_BASE_URL}${endpoint}`, config).then(async (response) => {
    console.log("response = ", response)

    // if (response.status === 401) {
    // console.log("hier...")

    // queryCache.clear()

    // await auth.logout()
    // refresh the page for them
    // window.location.assign("/")
    // return Promise.reject({ message: "Please re-authenticate." })
    // }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { client }
