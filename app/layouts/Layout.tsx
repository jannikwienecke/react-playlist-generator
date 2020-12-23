import { useSpotifyToken } from "app/context/AppProvider"
import { RootErrorFallback } from "app/pages/_app"
import { Head, useRouter } from "blitz"
import React, { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useQueryErrorResetBoundary } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Navbar from "./Navbar"
import ContainerApp from "app/components/ContainerApp"
import ContentContainer from "app/components/ContentContainer"
import ContainerSide from "app/components/ContainerSide"
import { SideNav } from "./Sidebar/SideNav"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const { token } = useSpotifyToken()
  const router = useRouter()

  React.useEffect(() => {
    if (token) return
    const tokenLocalstorage = window.localStorage.getItem("spotifyToken")
    const pathIndexOrRedirect = ["/", "/redirect"].includes(router.pathname)

    if (tokenLocalstorage) return

    if (pathIndexOrRedirect) return

    console.log("replace")
    router.replace("/")
  })

  return (
    <>
      <Head>
        <title>{title || "app-playlist-creator"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ContainerApp>
        <ContentContainer>
          <Navbar />
          <div>{children}</div>
        </ContentContainer>

        <ContainerSide>
          <SideNav />
        </ContainerSide>
      </ContainerApp>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default Layout
