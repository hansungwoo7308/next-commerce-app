import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";

export default function NavSideAccountMenu({ isClicked, setIsClicked }: any) {
  return (
    <Background
      className={`nav-side-background ${isClicked ? "visible" : ""}`}
      onClick={() => setIsClicked(false)}
    >
      <Box
        className={`nav-side-account-menu ${isClicked ? "move-in-screen" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          <li>
            <Link href={"/auth/signin"} onClick={() => setIsClicked(false)}>
              <div>Sign in</div>
              <IoIosArrowForward />
            </Link>
          </li>
          <li>
            <Link href={"/auth/signup"} onClick={() => setIsClicked(false)}>
              <div>Sign up</div>
              <IoIosArrowForward />
            </Link>
          </li>
        </ul>
      </Box>
    </Background>
  );
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  visibility: hidden;
  transition: visibility 0.2s;
  &.visible {
    visibility: visible;
  }
`;

const Box = styled.div`
  width: 365px;
  max-width: 50%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  color: #000;
  padding: 3rem 2rem;
  transform: translateX(100%);
  transition: transform 0.3s;
  &.move-in-screen {
    transform: translateX(0%);
  }

  a {
    justify-content: space-between;
    padding: 1rem;
    color: #777;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #000;
    }
  }
`;
