import Header from "@/components/layout/Header";
import Loading from "@/components/layout/Loading";
import Modal from "@/components/layout/Modal";
import Notify from "@/components/layout/Notify";
import logResponse from "lib/client/log/logResponse";
import { setCredentials } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { getData } from "lib/public/fetchData";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Layout({ children }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((store: any) => store.auth);
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
      console.log({ error });
      router.push("/auth/signin");
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    // accessToken이 없다면, refreshToken으로 모든 토큰을 갱신한다.
    const { accessToken } = auth;
    if (!accessToken) refreshAuth();
  }, []); // refresh credentials
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
