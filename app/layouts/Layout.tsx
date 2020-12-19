import { useSpotifyToken } from "app/context/AppProvider"
import { Head, useRouter } from "blitz"
import React, { ReactNode } from "react"
import Navbar from "./Navbar"
import { QueryClient, QueryClientProvider } from "react-query"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const [loading, setLoading] = React.useState(true)
  const { token } = useSpotifyToken()
  const router = useRouter()
  const queryClient = new QueryClient()

  React.useEffect(() => {
    if (token) return
    const tokenLocalstorage = window.localStorage.getItem("spotifyToken")
    const pathIndexOrRedirect = ["/", "/redirect"].includes(router.pathname)

    if (tokenLocalstorage) return

    if (pathIndexOrRedirect) return
    router.replace("/")
  })

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 500)
  // }, [])

  return (
    <>
      <Head>
        <title>{title || "app-playlist-creator"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  )
}

export default Layout
