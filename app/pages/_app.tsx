import LoginForm from "app/auth/components/LoginForm"
import { AppProvider, useSpotifyToken } from "app/context/AppProvider"
import { BaseProvider, LightTheme, DarkTheme } from "baseui"
import { AppProps, AuthenticationError, AuthorizationError, ErrorComponent, useRouter } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider as StyletronProvider } from "styletron-react"
import { styletron } from "../styletron"
import React from "react"
import { lightTheme } from "app/customTheme"

import "../styles.css"

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(lightTheme)
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  const toggleTheme = () => {
    if (theme === lightTheme) setTheme(DarkTheme)
    else setTheme(lightTheme)
  }

  const nextTheme = theme === lightTheme ? "DarkTheme" : "LightTheme"

  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <ErrorBoundary FallbackComponent={RootErrorFallback} resetKeys={[router.asPath]}>
              {getLayout(
                <Component toggleTheme={toggleTheme} nextTheme={nextTheme} {...pageProps} />
              )}
            </ErrorBoundary>
          </AppProvider>
        </QueryClientProvider>
      </BaseProvider>
    </StyletronProvider>
  )
}

export function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    )
  }
}
