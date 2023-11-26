import { signout } from "lib/client/store/authSlice";
import { setBackground } from "lib/client/store/backgroundSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { getData } from "lib/public/fetchData";
import { signOut, useSession } from "next-auth/react";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import { FcGlobe } from "react-icons/fc";

export default function AccountIcon() {
  // external
  const dispatch = useDispatch();
  const session = useSession();
  const auth = useSelector((store: any) => store.auth);

  // MOBILE only
  const handleOpenSideMenu = () => {
    if (window.innerWidth > 1000) return console.log("innerWidth is over 1000px.");
    dispatch(setBackground(true));
    dispatch(setSideMenu("account-menu"));
  };

  // internal
  const router = useRouter();

  const handleSignout = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      // console.log({ session });
      if (session.status === "authenticated") {
        signOut({ redirect: false });
        dispatch(signout());
        dispatch(setLoading(false));
        router.push("/auth/signin");
        // toast.success("Signed Out");
        // signOut({ callbackUrl: "/auth/signin" });
        return;
      }
      const response = await getData("v3/auth/signout");
      logResponse(response);
      dispatch(signout());
      dispatch(setLoading(false));
      router.push("/auth/signin");
      // toast.success("Signed Out");
    } catch (error: any) {
      logError(error);
      dispatch(setLoading(false));
      toast.error(error.message);
    }
  };

  if (session.status === "authenticated" || auth.accessToken) {
    return (
      <Box className="account-icon authenticated">
        <div className="avatar-outer" onClick={handleOpenSideMenu}>
          <div className="avatar">
            {auth.user?.image ? (
              <Image src={auth.user?.image} alt="alt" width={100} height={100} />
            ) : (
              <FcGlobe size={30} />
            )}
          </div>
        </div>
        <div className="hover-menu">
          <div className="arrow" />
          <Link href={"/my/account"}>
            <p>My Account</p>
          </Link>
          {/* {auth.user.role === "admin" && <></>} */}
          {auth.user?.role === "user" && (
            <Link href={"/my/orders"}>
              <p>Order List</p>
            </Link>
          )}
          <button onClick={handleSignout}>Sign out</button>
        </div>
      </Box>
    );
  }

  return (
    <Box className="account-icon">
      <div className="avatar-outer">
        <div className="avatar" onClick={handleOpenSideMenu}>
          <FcGlobe size={30} />
        </div>
      </div>
      <div className="hover-menu">
        <div className="arrow" />
        <Link href={"/auth/signin"}>Sign in</Link>
        <Link href={"/auth/signup"}>Sign up</Link>
      </div>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .avatar-outer {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 12px;
    &:hover {
      color: #fff;
    }
    &:hover + .hover-menu {
      display: block;
    }

    .avatar {
      border: 2px solid coral;
      border-radius: 50%;
      overflow: hidden;

      display: flex;

      img {
        width: 30px;
        height: 30px;
      }
    }
  }

  .hover-menu {
    position: absolute;
    top: 100%;
    background-color: gray;
    white-space: nowrap;
    padding: 1rem;
    display: none;
    &:hover {
      display: block;
    }

    .arrow {
      width: 0.7rem;
      height: 0.7rem;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      background-color: gray;
      pointer-events: none;
    }

    p {
      display: flex;
      align-items: center;
    }

    a,
    button {
      width: 100%;
      padding: 1rem;
      background-color: inherit;
      text-align: start;
    }
  }
`;
