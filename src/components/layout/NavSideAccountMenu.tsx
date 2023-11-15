import { setBackground } from "lib/client/store/backgroundSlice";
import { setSideMenu } from "lib/client/store/sideMenu";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function NavSideAccountMenu() {
  // external
  const sideMenu = useSelector((store: any) => store.sideMenu);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setBackground(false));
    dispatch(setSideMenu(""));
  };

  return (
    <>
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
    </>
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

  @media (max-width: 500px) {
    padding: 1rem;
  }
`;
