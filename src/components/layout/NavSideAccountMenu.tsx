import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
import { signout } from "lib/client/store/authSlice";
import { setBackground } from "lib/client/store/backgroundSlice";
import { setLoading } from "lib/client/store/loadingSlice";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { getData } from "lib/public/fetchData";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function NavSideAccountMenu() {
  // external
  const session = useSession();
  const auth = useSelector((store: any) => store.auth);
  const sideMenu = useSelector((store: any) => store.sideMenu);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignout = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      if (session.status === "authenticated") {
        signOut({ redirect: false });
        // signOut({ callbackUrl: "/auth/signin" });
      } else {
        const response = await getData("v3/auth/signout");
        logResponse(response);
      }
      dispatch(signout());
      dispatch(setLoading(false));
      dispatch(setSideMenu(false));
      router.push("/auth/signin");
      // toast.success("Signed Out");
    } catch (error: any) {
      logError(error);
      dispatch(setLoading(false));
      dispatch(setSideMenu(false));
      toast.error(error.message);
    }
    handleClose();
  };

  const handleClose = () => {
    dispatch(setBackground(false));
    dispatch(setSideMenu(""));
  };

  if (session.status === "authenticated" || auth.accessToken) {
    return (
      <Box
        className={`nav-side-account-menu ${
          sideMenu.value === "account-menu" ? "move-in-screen" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          <li>
            <Link href={"/my/account"} onClick={handleClose}>
              <div>My Account</div>
              <IoIosArrowForward />
            </Link>
          </li>
          <li>
            <Link href={"/my/orders"} onClick={handleClose}>
              <div>Order List</div>
              <IoIosArrowForward />
            </Link>
          </li>
          <li>
            <button className="general-button" onClick={handleSignout}>
              Sign out
            </button>
          </li>
        </ul>
      </Box>
    );
  }

  return (
    <Box
      className={`nav-side-account-menu ${
        sideMenu.value === "account-menu" ? "move-in-screen" : ""
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <ul>
        <li>
          <Link href={"/auth/signin"} onClick={handleClose}>
            <div>Sign in</div>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link href={"/auth/signup"} onClick={handleClose}>
            <div>Sign up</div>
            <IoIosArrowForward />
          </Link>
        </li>
      </ul>
    </Box>
  );
}

const Box = styled.div`
  position: fixed;
  top: 0;
  /* left: 0; */
  right: 0;
  width: 365px;
  max-width: 50%;
  height: 100vh;

  background-color: #fff;
  color: #000;
  padding: 3rem 2rem;
  z-index: 2000;

  /* move in screen */
  transform: translateX(100%);
  transition: transform 0.3s;
  &.move-in-screen {
    transform: translateX(0%);
  }

  a {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    color: #777;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #000;
    }
  }
  button {
    width: 100%;
  }

  @media (max-width: 500px) {
    padding: 1rem;
  }
`;
