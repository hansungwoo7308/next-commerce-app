import Header from "@/components/layout/Header";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import Notify from "@/components/layout/Notify";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { setCredentials } from "lib/client/store/authSlice";
import { reloadCart } from "lib/client/store/cartSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { getData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Layout({ children }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((store: any) => store.auth);
  const cart = useSelector((store: any) => store.cart);
  const refreshAuth = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getData("auth/refresh");
      logResponse(response);
      // console.log({ response });
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, accessToken }));
      dispatch(setLoading(false));
    } catch (error) {
      logError(error);
      router.push("/auth/signin");
      dispatch(setLoading(false));
    }
  };
  // auth side effect
  useEffect(() => {
    // accessToken이 없다면, refreshToken으로 모든 토큰을 갱신한다.
    const { accessToken } = auth;
    if (!accessToken) refreshAuth();
  }, []); // refresh credentials
  // cart side effect
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
      <Loading />
      <Modal />
      <Notify />
      <Header />
      {children}
    </>
  );
}
