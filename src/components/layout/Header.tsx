import Search from "@/components/Search";
import Nav from "@/components/layout/Nav";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
let renderCount = 0;
export default function Header() {
  const auth = useSelector((store: any) => store.auth);
  const [dropdown, setDropdown]: any = useState(false);
  useEffect(() => {
    document.addEventListener("click", () => setDropdown(false));
  }, []);
  return (
    <Box>
      <section>
        {/* <Link href={"/"}>Logo</Link> */}
        <Nav />
        <Search />
        <Link href={"/cart"}>Cart</Link>
        {auth.user && (
          <div className="profile">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdown(!dropdown);
              }}
            >
              Profile
            </button>
            {dropdown && (
              <div className="dropdown">
                <Link href={"/"}>menu</Link>
                <Link href={"/"}>menu</Link>
                <Link href={"/"}>menu</Link>
                <button>Sign out</button>
              </div>
            )}
          </div>
        )}
        {!auth.user && (
          <div className="auth">
            <Link href={"/auth/signin"}>Sign in</Link>
            <Link href={"/auth/signup"}>Sign up</Link>
          </div>
        )}
      </section>
    </Box>
  );
}
const Box = styled.header`
  /* display: none; */
  font-size: 1rem;
  height: 50px;
  background-color: var(--color-navigation-background);
  > section {
    > .auth {
      display: flex;
    }
    > .profile {
      display: flex;
      gap: 1rem;
      /* border: 2px solid blue; */
      > .dropdown {
        position: absolute;
        top: 100%;
        border: 2px solid red;
        background-color: gray;
        border: none;
        /* margin-top: 10px; */
        > * {
          border: 2px solid;
        }
        > button {
          /* height: 100%; */
        }
        > a,
        button {
          padding: 1rem;
          border: none;
          background-color: inherit;
          /* color: inherit; */
        }
      }
    }
  }
  /* public */
  a,
  button {
    padding: 0 1rem;
    border-radius: 5px;
  }
  a {
    display: flex;
    align-items: center;
  }
`;
