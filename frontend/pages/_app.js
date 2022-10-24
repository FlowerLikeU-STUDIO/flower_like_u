import Layout from "../components/layouts/Layout";
import wrapper from "../store";
import "../styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default wrapper.withRedux(MyApp);
