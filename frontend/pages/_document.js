/*
 * _document는 _app 다음에 실행되며,
 * 공통적으로 활용할 <head> (Ex. 메타 태그)나
 * <body> 태그 안에 들어갈 내용들을 커스텀할때 활용합니다.
 */

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>너닮꽃</title>
          {/* ICON */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
