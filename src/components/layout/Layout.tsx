import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import NavSideAccountMenu from "@/components/layout/NavSideAccountMenu";
import NavSideProductMenu from "@/components/layout/NavSideProductMenu";
import { GlobalStyled } from "@/styles/global.styled";
import { setCredentials } from "lib/client/store/authSlice";
import { reloadCart } from "lib/client/store/cartSlice";
import { refreshAuth } from "lib/client/utils/authUtils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";

export default function Layout({ children }: any) {
  // external
  const { data: session } = useSession();
  const { user, accessToken: token } = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();

  // internal
  const [theme, setTheme]: any = useState("dark");

  // const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleTheme = () => {
    const newState = theme === "dark" ? "light" : "dark";
    setTheme(newState);
    localStorage.setItem("theme", newState);
  };

  // theme
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setTheme("dark");
    if (theme === "light") setTheme("light");
  }, []);

  // auth
  // nextauth library를 사용한 인증(jwt, oauth)
  // general authentication & authorization (jwt)ㅔ
  useEffect(
    // set the credentials from session (nextauth)
    () => {
      if (!session) return;
      // console.log({ session });
      const { user } = session;
      const credentials = { user };
      dispatch(setCredentials(credentials));
    },
    [session, dispatch]
  );
  useEffect(
    // if no token, refresh the token (general)
    () => {
      if (session) return;
      // if (!token) refreshAuth(dispatch);
    },
    [token, dispatch]
  );

  // cart
  useEffect(
    // storage > store
    () => {
      const getCartFromStorage = () => {
        const serializedCart: any = localStorage.getItem("cart");
        const parsedCart = JSON.parse(serializedCart);
        // if (!serializedCart || !parsedCart.products.length)
        //   return console.log("No cached cart data");
        return parsedCart;
      };

      // get the cart data from storage
      const cart = getCartFromStorage();
      if (!cart || !cart.products.length) return;

      // set the store
      dispatch(reloadCart(cart));
    },
    [dispatch]
  );
  useEffect(
    // store > storage
    () => {
      if (!cart.products?.length) return localStorage.removeItem("cart");

      // set the storage
      const serializedCart: any = JSON.stringify(cart);
      localStorage.setItem("cart", serializedCart);
    },
    [cart]
  );

  return (
    <>
      <GlobalStyled theme={theme} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      {/* {router.pathname === "/auth/signin" ? null : <Header />} */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Loading />
      <Background />
      <NavSideProductMenu />
      <NavSideAccountMenu theme={theme} toggleTheme={toggleTheme} />

      <Modal />

      {/* Body */}
      <Header />
      {children}
      <Footer />
    </>
  );
}
