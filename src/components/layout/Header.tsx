import Search from "@/components/Search";
import Nav from "@/components/layout/Nav";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";
export default function Header() {
  return (
    <Box>
      <section>
        {/* <Link href={"/"}>Logo</Link> */}
        <Nav />
        <Search />
        <div className="right">
          <Link href={"/cart"}>Cart</Link>
          <Link href={"/signin"}>Sign in</Link>
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
    background-color: #333;
  }
  a {
    display: flex;
    align-items: center;
  }
`;
