import { useSpotifyToken } from "app/context/AppProvider"
import { RootErrorFallback } from "app/pages/_app"
import { Head, useRouter } from "blitz"
import React, { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useQueryErrorResetBoundary } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Navbar from "./Navbar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const { token } = useSpotifyToken()
  const router = useRouter()
  const { reset } = useQueryErrorResetBoundary()

  React.useEffect(() => {
    if (token) return
    const tokenLocalstorage = window.localStorage.getItem("spotifyToken")
    const pathIndexOrRedirect = ["/", "/redirect"].includes(router.pathname)

    if (tokenLocalstorage) return

    if (pathIndexOrRedirect) return
    router.replace("/")
  })

  return (
    <>
      <Head>
        <title>{title || "app-playlist-creator"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        onReset={reset}
      >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ErrorBoundary>
    </>
  )
}

export default Layout
