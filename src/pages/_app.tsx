import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "lib/client/store/store";
import Layout from "@/components/layout/Layout";
import { GlobalStyled } from "@/styles/global.styled";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PayPalScriptProvider
        options={{
          clientId:
            // "Ab2uPl_Wo2-UDJ569Byt3xFloItf-fgdla5iQwfryndLbQFASTbwSr23GUJXj7B9lyybjL44iKADN1ZH",
            // "AebB-qLz2QRa3l02i9y8SLFAZudUsX09K53hp8lMxfo1i29Ogv45n2Ldv4gCEH7-xok18myEaJtsc24f",
            // "ARL6BSMyqeQMRB31JuDJqvSeOryXUsFjLWyWOR8cG7oLi7peAw6LM3KDE37fUFEZawTeKyuESe5d4BbD",
            "AShEuT2KH5QzaB4DH66inHArChvuaM6k6LW7twtxB7bbCJvHnesxT1fPCq5nx5JwZ6QnD6kAAT5y5Qfv",
          currency: "USD",
        }}
      >
        <Layout>
          <GlobalStyled />
          <Component {...pageProps} />
        </Layout>
      </PayPalScriptProvider>
    </Provider>
  );
}
