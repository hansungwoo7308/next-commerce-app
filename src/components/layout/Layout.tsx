import Header from "@/components/layout/Header";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import Notify from "@/components/layout/Notify";
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
      // logResponse(response);
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, accessToken }));
      dispatch(setLoading(false));
    } catch (error) {
      // logError(error);
      // router.push("/auth/signin");
      dispatch(setLoading(false));
    }
  };

  // set the credentials
  // general jwt : accessToken(redux store), refreshToken(cookie)
  // next-auth session token (cookie)
  useEffect(() => {
    if (session.status === "authenticated") return console.log("session"); // session 방식으로 구현했다면 리프레시를 패스한다.
    if (!auth.accessToken) refreshAuth(); // accessToken이 없다면, refreshToken으로 모든 토큰을 갱신한다.
  }, [auth.accessToken]); // refresh credentials
  useEffect(() => {
    if (session.status === "authenticated") {
      const credentials = { user: session.data.user, accessToken: "next-auth" };
      dispatch(setCredentials(credentials));
    }
  }, [session.status]);

  // 로컬스토리지로부터 리덕스스토어에 카트정보를 채운다.
  useEffect(() => {
    const serializedCart: any = localStorage.getItem("cart");
    if (!serializedCart) return;
    const parsedCart = JSON.parse(serializedCart);
    if (!parsedCart.products.length) return console.log("8382912");
    // console.log({ parsedCart });
    dispatch(reloadCart(parsedCart));
  }, []); // if loaded, cache
  useEffect(() => {
    if (!cart.products?.length) return;
    const serializedCart: any = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  }, [cart]); // if cart is changed, cache
  useEffect(() => {
    if (cart.products?.length) console.log({ "cart.products": cart.products });
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
      <Notify />
      <Header />
      {children}
    </>
  );
}
