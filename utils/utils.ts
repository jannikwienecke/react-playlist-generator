import { SPOTIFY_BASE_URL } from "app/spotifyConfig"
interface PropsClient {
  endpoint: string
  token: string
  data?: {} | undefined
  method?: "GET" | "POST" | "PUT"
}
async function client({ endpoint, token, data = undefined, method = "GET" }: PropsClient) {
  if (!token) {
    console.warn("No Token provided")
    return
  }
  const config = {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: `Bearer 1${token}`,
    },
  }

  return window.fetch(`${SPOTIFY_BASE_URL}${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      window.localStorage.setItem("spotifyToken", "")
      window.localStorage.setItem("spotifyRefreshToken", "")
      window.location.assign("/")
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

function createResource(promise) {
  let status = "pending"
  let result = promise.then(
    (resolved) => {
      status = "success"
      result = resolved
    },
    (rejected) => {
      status = "error"
      result = rejected
    }
  )
  return {
    read() {
      console.log("reading...")
      console.log("status", status)
      console.log("result", result)
      if (status === "pending") throw result
      if (status === "error") throw result
      if (status === "success") return result
      throw new Error("This should be impossible")
    },
  }
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = document.createElement("img")
    img.src = src
    img.onload = () => resolve(src)
  })
}

export { createResource, preloadImage }
export { client }
