import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import NavSideAccountMenu from "@/components/layout/NavSideAccountMenu";
import NavSideProductMenu from "@/components/layout/NavSideProductMenu";
import { setCredentials } from "lib/client/store/authSlice";
import { reloadCart } from "lib/client/store/cartSlice";
import { refreshAuth } from "lib/client/utils/authUtils";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: any) {
  // external
  const { data: session } = useSession();
  const { accessToken } = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();

  // auth
  // nextauth library를 사용한 인증(jwt, oauth)
  // general authentication & authorization (jwt)
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
      // if (session) return;
      if (!session && !accessToken) {
        refreshAuth(dispatch);
      }
    },
    [accessToken, dispatch]
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
      <NavSideAccountMenu />

      <Modal />

      <Header />
      {children}
      <Footer />
    </>
  );
}
