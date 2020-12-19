import { BlitzScript } from "blitz"
import Document, { Head, Html, Main } from "next/document"
import { Provider as StyletronProvider } from "styletron-react"
import { styletron } from "../styletron"

class MyDocument extends Document {
  static getInitialProps(props) {
    const page = props.renderPage((App) => (props) => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ))

    let stylesheets: any[] = []
    if ("getStylesheets" in styletron) {
      stylesheets = styletron.getStylesheets() || []
    }
    return { ...page, stylesheets }
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props &&
            this.props.stylesheets &&
            this.props.stylesheets.map((sheet, i) => (
              <style
                className="_styletron_hydrate_"
                dangerouslySetInnerHTML={{ __html: sheet.css }}
                media={sheet.attrs.media}
                data-hydrate={sheet.attrs["data-hydrate"]}
                key={i}
              />
            ))}
        </Head>
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
