"use client";
import Search from "@/components/Search";
import Nav from "@/components/layout/Nav";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
let renderCount = 0;
export default function Header() {
  const { auth }: any = useSelector((store) => store);
  // useEffect(() => {
  //   if (auth.user) console.log({ user: auth.user });
  // }, [auth]);
  return (
    <Box>
      <section>
        {/* <Link href={"/"}>Logo</Link> */}
        <Nav />
        <Search />
        <div className="right">
          <Link href={"/cart"}>Cart</Link>
          <Link href={"/auth/signin"}>Sign in</Link>
          <Link href={"/auth/signup"}>Sign up</Link>
          {auth.user && <h5>Profile</h5>}
        </div>
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
    > .right {
      display: flex;
      gap: 1rem;
      /* border: 2px solid blue; */
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
