import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "lib/client/store/store";
import Layout from "@/components/layout/Layout";
import { GlobalStyled } from "@/styles/global.styled";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <GlobalStyled />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
