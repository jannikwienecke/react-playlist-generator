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

  // this props has the property stylesheets.
  // but ts always complains about it
  // changing the Document type will reverted by Blitz
  //thats why I defined the anyprops
  anyProps: any = this.props
  render() {
    return (
      <Html>
        <Head>
          {this.props &&
            this.anyProps.stylesheets &&
            this.anyProps.stylesheets.map((sheet, i) => (
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
