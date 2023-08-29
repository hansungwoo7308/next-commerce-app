import Header from "@/components/layout/Header";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import Notify from "@/components/layout/Notify";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { setCredentials, signout } from "lib/client/store/authSlice";
import { reloadCart } from "lib/client/store/cartSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { getData } from "lib/public/fetchData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const session: any = useSession();
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const refreshAuth = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getData("v2/auth/refresh");
      // const response = await getData("auth/refresh");
      logResponse(response);
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, accessToken }));
      dispatch(setLoading(false));
    } catch (error) {
      logError(error);
      // router.push("/auth/signin");
      dispatch(setLoading(false));
    }
  };
  // set the credentials
  // general jwt : accessToken(redux store), refreshToken(cookie)
  // next-auth session token (cookie)
  useEffect(() => {
    if (session.status === "authenticated") return console.log("session"); // session 방식으로 구현했다면 리프레시를 패스한다.
    // accessToken이 없다면, refreshToken으로 모든 토큰을 갱신한다.
    // console.log("general");
    if (!auth.accessToken) refreshAuth();
  }, [auth.accessToken]); // refresh credentials
  useEffect(() => {
    if (session.status === "authenticated") {
      const credentials = { user: session.data.user, accessToken: "next-auth" };
      dispatch(setCredentials(credentials));
    }
  }, [session.status]);
  // set the cart (localStorage, redux store)
  useEffect(() => {
    const serializedCart: any = localStorage.getItem("cart");
    if (!serializedCart) return;
    const parseCart = JSON.parse(serializedCart);
    // console.log("parseCart : ", parseCart);
    dispatch(reloadCart(parseCart));
    // parseCart.map((v: any) => {
    //   dispatch(addToCart(v));
    // });
  }, []); // if loaded, cache
  useEffect(() => {
    if (!cart.length) return;
    const stringfiedCart = JSON.stringify(cart);
    localStorage.setItem("cart", stringfiedCart);
  }, [cart]); // if cart is changed, cache
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
      <Notify />
      <Header />
      {children}
    </>
  );
}
