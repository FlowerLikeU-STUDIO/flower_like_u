import Layout from "../components/layouts/Layout";
import wrapper from "../store";
import "../styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>너닮꽃</title>
        <meta
          name="naver-site-verification"
          content="718acb83cbb6640321ea131f1052fd20194a9ea1"
        />
        <meta
          name="google-site-verification"
          content="-oNcTUA0ev8sPDfEhoKwvUb7eeBdz8cLHPBcya7aTMg"
        />
        <meta
          name="description"
          content={
            "너닮꽃 | 너를 닮은 꽃 여러분만의 커스텀 꽃다발을 제작하고 사랑하는 이에게 선물해보세요."
          }
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={"너닮꽃 | 너를 닮은 꽃"} />
        <meta
          property="og:description"
          content={
            "너닮꽃 | 너를 닮은 꽃 여러분만의 커스텀 꽃다발을 제작하고 사랑하는 이에게 선물해보세요."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://www.flowerlikeu.com/"} />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
