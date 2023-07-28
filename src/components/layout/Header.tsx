import Search from "@/components/Search";
import Nav from "@/components/layout/Nav";
import Link from "next/link";
import { styled } from "styled-components";
export default function Header() {
  return (
    <Box>
      <section>
        {/* <Link href={"/"}>Logo</Link> */}
        <Nav />
        <div className="center">
          <Search />
        </div>
        <div className="right">
          <Link href={"/cart"}>Cart</Link>
          <Link href={"/signin"}>Sign in</Link>
        </div>
      </section>
    </Box>
  );
}
const Box = styled.header`
  font-size: 1rem;
  > section {
    > * {
      display: flex;
      align-items: center;
      border: 2px solid;
    }
    > .center {
    }
    > .right {
      display: flex;
      gap: 1rem;
    }
  }
  a {
    display: inline-block;
    /* height: 100%; */
    display: flex;
    align-items: center;
    padding: 1rem;
  }
  a,
  button {
    background-color: #333;
    padding: 1rem;
  }
  /* button {
    background-color: #333;
    padding: 0.2rem;
  } */
`;
