import LoginForm from "app/auth/components/LoginForm"
import { AppProvider } from "app/context/AppProvider"
import { BaseProvider, LightTheme } from "baseui"
import { AppProps, AuthenticationError, AuthorizationError, ErrorComponent, useRouter } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider as StyletronProvider } from "styletron-react"
import { styletron } from "../styletron"
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <ErrorBoundary FallbackComponent={RootErrorFallback} resetKeys={[router.asPath]}>
              {getLayout(<Component {...pageProps} />)}
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
