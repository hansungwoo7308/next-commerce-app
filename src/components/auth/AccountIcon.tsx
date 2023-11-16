import NavSideAccountMenu from "@/components/layout/NavSideAccountMenu";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { signout } from "lib/client/store/authSlice";
import { setBackground } from "lib/client/store/backgroundSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { setSideMenu } from "lib/client/store/sideMenu";
import { getData } from "lib/public/fetchData";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { styled } from "styled-components";

export default function AccountIcon() {
  // external
  const dispatch = useDispatch();
  const session = useSession();
  const auth = useSelector((store: any) => store.auth);

  // internal
  const router = useRouter();

  // in MOBILE
  const handleOpenSideMenu = () => {
    dispatch(setBackground(true));
    dispatch(setSideMenu("account-menu"));
  };

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
    if (auth.user)
      return (
        <Box>
          <div className="account-icon authenticated WEB">
            <div className="avatar-outer">
              <div className="avatar">
                <Image
                  src={auth.user?.image || "/images/placeholder.jpg"}
                  alt="alt"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="hover-menu">
              <div className="arrow" />
              <Link href={"/my/account"}>
                <p>My Account</p>
              </Link>
              {auth.user?.role === "admin" && <></>}
              {auth.user?.role === "user" && (
                <>
                  <Link href={"/my/orders"}>
                    <p>Order List</p>
                  </Link>
                </>
              )}
              <button onClick={handleSignout}>Sign out</button>
            </div>
          </div>
          <div className="account-icon authenticated MOBILE">
            <button className="avatar" onClick={handleOpenSideMenu}>
              <FaCircleUser size={25} />
            </button>
          </div>
        </Box>
      );
  }

  return (
    <Box>
      <div className="account-icon WEB">
        <div className="avatar-outer">
          <div className="avatar">
            <FaCircleUser size={25} />
          </div>
        </div>
        <div className="hover-menu">
          <div className="arrow" />
          <Link href={"/auth/signin"}>Sign in</Link>
          <Link href={"/auth/signup"}>Sign up</Link>
        </div>
      </div>
      <div className="account-icon MOBILE">
        <button className="avatar" onClick={handleOpenSideMenu}>
          <FaCircleUser size={25} />
        </button>
      </div>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1rem;
  position: relative;

  > * {
    /* padding: 1rem; */
    /* border: 1px solid red; */
  }

  /* when authorized */
  .account-icon.authenticated.WEB {
    height: 100%;
    gap: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    border: 2px solid skyblue;

    .avatar-outer {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 1rem;
      /* border: 1px solid; */
      &:hover {
        color: #fff;
      }
      &:hover + .hover-menu {
        display: block;
      }

      .avatar {
        width: 2rem;
        height: 2rem;

        /* border: 1px solid; */
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .hover-menu {
      position: absolute;
      top: 100%;
      /* margin-top: 1rem; */
      border: 2px solid skyblue;
      background-color: gray;
      white-space: nowrap;
      padding: 1rem;

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

      a,
      button {
        width: 100%;
        padding: 1rem;
        background-color: inherit;
        text-align: start;
      }
    }

    p {
      display: flex;
      align-items: center;
    }
  }
  .account-icon.authenticated.MOBILE {
  }

  /* when unauthorized */
  .account-icon.WEB {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .avatar-outer {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 1rem;
      /* border: 1px solid; */
      &:hover {
        color: #fff;
      }
      &:hover + .hover-menu {
        display: block;
      }

      .avatar {
        width: 100%;
        height: 100%;
        /* border: 1px solid; */
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .hover-menu {
      display: none;
      position: absolute;
      top: 100%;
      background-color: gray;
      white-space: nowrap;
      padding: 1rem;
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
    }
  }
  .account-icon.MOBILE {
    display: none;
    align-items: center;
    justify-content: center;
  }

  /* public */
  button,
  a {
    color: #ccc;
  }
`;
