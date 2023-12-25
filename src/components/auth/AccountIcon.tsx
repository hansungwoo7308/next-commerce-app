import { setBackground } from "lib/client/store/backgroundSlice";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { FcGlobe } from "react-icons/fc";
import { signout } from "lib/client/utils/authUtils";
import { useEffect } from "react";

export default function AccountIcon() {
  // external
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { user, accessToken: token } = useSelector((store: any) => store.auth);

  // MOBILE only
  const handleOpenSideMenu = () => {
    // if (window.innerWidth > 1000) return console.log("innerWidth is over 1000px.");
    dispatch(setBackground(true));
    dispatch(setSideMenu("account-menu"));
  };

  const handleSignout = () => {
    signout(dispatch, { session, token });
  };

  useEffect(() => {
    // console.log({ session });
    // console.log({ isSession: session ? true : false });
  }, [session]);

  if (session || token) {
    return (
      <Box className="account-icon authenticated">
        <div className="avatar-outer" onClick={handleOpenSideMenu}>
          <div className="avatar">
            {user?.image ? (
              <Image src={user?.image} alt="alt" width={100} height={100} />
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
          {/* {user.role === "admin" && <></>} */}
          {user?.role === "user" && (
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
