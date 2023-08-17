import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { signout } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { getData } from "lib/public/fetchData";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { styled } from "styled-components";
export default function Account() {
  const session = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((store: any) => store.auth);
  const [toggle, setToggle]: any = useState(false);
  const handleToggle = (e: any) => {
    e.stopPropagation();
    setToggle((value: boolean) => !value);
  };
  const handleSignout = async (e: any) => {
    e.preventDefault();
    try {
      console.log({ session });
      if (session.status === "authenticated") return handleSignoutWithNextAuth();
      dispatch(setLoading(true));
      const response = await getData("v3/auth/signout");
      logResponse(response);
      dispatch(signout());
      dispatch(setLoading(false));
      toast.success("Signed Out");
      router.push("/auth/signin");
    } catch (error: any) {
      logError(error);
      dispatch(setLoading(false));
      toast.error(error.message);
    }
  };
  const handleSignoutWithNextAuth = () => {
    signOut({ redirect: false });
    toast.success("Signed Out");
    router.push("/auth/signin");
    // signOut({ callbackUrl: "/auth/signin" });
  };
  useEffect(() => {
    document.addEventListener("click", () => setToggle(false));
  }, []);
  if (!auth.accessToken) {
    return (
      <Box>
        <Link href={"/auth/signin"}>Sign in</Link>
        <Link href={"/auth/signup"}>Sign up</Link>
      </Box>
    );
  }
  return (
    <Box>
      <button onClick={handleToggle}>Account ({auth.user?.role})</button>
      {toggle && auth.user?.role === "admin" && (
        <div className="toggle">
          <Link href={"/my/profile"}>Profile</Link>
          <button onClick={handleSignout}>Sign out</button>
        </div>
      )}
      {toggle && auth.user?.role === "user" && (
        <div className="toggle">
          <Link href={"/my/profile"}>Profile</Link>
          <Link href={"/my/order-list"}>Order List</Link>
          <button onClick={handleSignout}>Sign out</button>
        </div>
      )}
    </Box>
  );
}
const Box = styled.div`
  display: flex;
  gap: 1rem;
  > .toggle {
    position: absolute;
    top: 100%;
    border: 2px solid red;
    background-color: gray;
    border: none;
    /* margin-top: 10px; */
    > * {
      border: 2px solid red;
    }
    > a,
    button {
      width: 100%;
      padding: 1rem;
      border: none;
      background-color: inherit;
      text-align: start;
      /* color: inherit; */
    }
  }
`;
