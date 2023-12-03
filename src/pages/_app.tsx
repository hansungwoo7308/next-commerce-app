import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "lib/client/store/store";
import Layout from "@/components/layout/Layout";
import { GlobalStyled } from "@/styles/global.styled";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <PayPalScriptProvider
          options={{
            clientId:
              "AcULxbuM10RVy-N1_GM-dMDW35qOoqKjNNX99mVOKvKwzJ_Q74Agh4GlbclFt5VJhvqqt_ltBGWvpNti",
            currency: "USD",
          }}
        >
          <Layout>
            <GlobalStyled />
            <ThemeProvider theme={{}}>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1"
                />
              </Head>
              <Component {...pageProps} />
            </ThemeProvider>
          </Layout>
        </PayPalScriptProvider>
      </SessionProvider>
    </Provider>
  );
}
