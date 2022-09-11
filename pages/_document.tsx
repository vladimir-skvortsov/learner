import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { CssBaseline } from '@nextui-org/react'

class MyDocument extends Document {
  static getInitialProps = async (context: DocumentContext) => {
    const initialProps = await Document.getInitialProps(context)
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    }
  }

  render = () =>
    <Html lang='ru'>
      <Head>{CssBaseline.flush()}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
}

export default MyDocument
