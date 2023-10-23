import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import { reloadCart } from "lib/client/store/cartSlice";
import { refreshAuth } from "lib/client/utils/authUtils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: any) {
  // external
  const session: any = useSession();
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();

  // internal
  const router = useRouter();

  // set the credentials
  // general jwt : accessToken(redux store), refreshToken(cookie)
  // next-auth session token (cookie)
  useEffect(() => {
    // if (session.status === "authenticated") return console.log("session"); // session 방식으로 구현했다면 리프레시를 패스한다.
    // if (!auth.accessToken) refreshAuth();
    if (!auth.accessToken) refreshAuth(dispatch);
  }, [auth.accessToken]); // refresh credentials
  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     const credentials = { user: session.data.user, accessToken: "next-auth" };
  //     dispatch(setCredentials(credentials));
  //   }
  // }, [session.status]);

  // upload cart data from local storage to redux store
  useEffect(() => {
    // 로컬스토리지로부터 리덕스스토어에 카트정보를 채운다.
    const serializedCart: any = localStorage.getItem("cart");
    if (!serializedCart) return;
    const parsedCart = JSON.parse(serializedCart);
    if (!parsedCart.products.length) return console.log("8382912");
    // console.log({ parsedCart });
    dispatch(reloadCart(parsedCart));
  }, []);
  // upload cart data to local storage
  useEffect(() => {
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
      <Loading />
      <Modal />
      {/* <Notify /> */}
      <Header />
      {children}
      <Footer />
    </>
  );
}
