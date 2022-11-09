import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* ICON */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined"
        />
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
