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
