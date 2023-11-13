import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { signout } from "lib/client/store/authSlice";
import { setLoading } from "lib/client/store/loadingSlice";
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
  const [toggle, setToggle]: any = useState(false);

  const handleToggle = (e: any) => {
    e.stopPropagation();
    setToggle((value: boolean) => !value);
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
  useEffect(() => {
    document.addEventListener("click", () => setToggle(false));
  }, []);

  if (session.status === "authenticated" || auth.accessToken) {
    if (auth.user)
      return (
        <Box>
          <div className="account-outer">
            <div className="account">
              <div className="avatar" onClick={handleToggle}>
                <Image
                  src={auth.user?.image || "/images/placeholder.jpg"}
                  alt="alt"
                  width={100}
                  height={100}
                />
              </div>
              {toggle && (
                <div className="toggle-menu">
                  <div className="toggle-menu-arrow" />
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
                  {/* <hr /> */}
                  <HorizonLine />
                  <button onClick={handleSignout}>Sign out</button>
                </div>
              )}
            </div>
            <p>
              {auth.user?.name || auth.user?.username} ({auth.user?.role || "naver user"})
            </p>
          </div>
        </Box>
      );
  }
  return (
    <Box>
      <button className="account-icon">
        <FaCircleUser size={25} />
      </button>
      <div className="toggle">
        <div className="toggle-arrow" />
        <Link href={"/auth/signin"}>Sign in</Link>
        <Link href={"/auth/signup"}>Sign up</Link>
      </div>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  align-items: stretch;
  gap: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  > * {
    /* padding: 1rem; */
    /* border: 1px solid red; */
  }

  /* when authorized */
  > .account-outer {
    height: 100%;
    display: flex;
    gap: 0.5rem;
    > .account {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      > .avatar {
        width: 2rem;
        height: 2rem;
        border: 2px solid;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
      }
      > .toggle-menu {
        position: absolute;
        top: 100%;
        /* margin-top: 1rem; */
        /* border: 2px solid green; */
        background-color: gray;
        white-space: nowrap;
        padding: 1rem;
        > .toggle-menu-arrow {
          width: 0.7rem;
          height: 0.7rem;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%) translateY(-50%) rotate(45deg);
          background-color: gray;
          pointer-events: none;
        }
        > a,
        button {
          width: 100%;
          padding: 1rem;
          background-color: inherit;
          text-align: start;
          /* color: inherit; */
        }
      }
    }
    > p {
      display: flex;
      align-items: center;
    }
  }

  /* when unauthorized */
  > .account-icon {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 1rem;
    &:hover {
      color: #fff;
    }
    &:hover + .toggle {
      display: block;
    }
  }
  > .toggle {
    display: none;
    position: absolute;
    top: 100%;
    background-color: gray;
    white-space: nowrap;
    padding: 1rem;
    &:hover {
      display: block;
    }
    > .toggle-arrow {
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

  /* public */
  button,
  a {
    color: #ccc;
  }
`;
const HorizonLine = styled.hr`
  margin: 1rem 0;
`;
