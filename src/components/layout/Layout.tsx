import Header from "@/components/layout/Header";
import { setCredentials } from "lib/client/store/authSlice";
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
      // dispatch(setLoading(true));
      const response = await getData("auth/refresh");
      console.log({ data: response.data });
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, accessToken }));
      // dispatch(setLoading(false));
    } catch (error) {
      console.log({ error });
      // dispatch(setLoading(false));
      // router.push("/");
    }
  };
  useEffect(() => {
    const { accessToken } = auth;
    if (!accessToken) refreshAuth();
  }, []);
  return (
    <>
      {/* {router.pathname === "/auth/signin" ? null : <Header />} */}
      <Header />
      {children}
    </>
  );
}
