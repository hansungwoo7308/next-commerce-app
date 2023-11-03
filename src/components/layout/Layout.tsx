import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import { setCredentials } from "lib/client/store/authSlice";
import { reloadCart } from "lib/client/store/cartSlice";
import { refreshAuth } from "lib/client/utils/authUtils";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: any) {
  // external
  const session = useSession();
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();

  // auth
  useEffect(() => {
    // general authentication : jwt(accessToken(redux store), refreshToken(cookie))
    if (session.status === "authenticated") {
      if (!session.data.user) return;
      const credentials = { user: session.data.user };
      dispatch(setCredentials(credentials));
    }
  }, [session.status, dispatch]);
  useEffect(() => {
    // next-auth : session token based on jwt (cookie)
    // if (session.status === "authenticated") return;
    if (session) return;
    if (!auth.accessToken) refreshAuth(dispatch);
  }, [auth.accessToken, dispatch]);

  // cart
  useEffect(() => {
    // upload cart data from local storage to redux store
    // 로컬스토리지로부터 리덕스스토어에 카트정보를 채운다.
    const serializedCart: any = localStorage.getItem("cart");
    if (!serializedCart) return;
    const parsedCart = JSON.parse(serializedCart);
    if (!parsedCart.products.length) return console.log("8382912");
    // console.log({ parsedCart });
    dispatch(reloadCart(parsedCart));
  }, [dispatch]);
  useEffect(() => {
    // upload cart data from redux store to local storage
    if (!cart.products?.length) return;
    const serializedCart: any = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  }, [cart]);

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
      <Background />
      <Loading />
      <Modal />
      <Header />
      {children}
      <Footer />
    </>
  );
}
