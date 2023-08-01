import Search from "@/components/Search";
import Nav from "@/components/Nav";
import Link from "next/link";
import { styled } from "styled-components";
import Account from "@/components/Account";
let renderCount = 0;
export default function Header() {
  return (
    <Box>
      <section>
        {/* <Link href={"/"}>Logo</Link> */}
        <Nav />
        <Search />
        <Link href={"/cart"}>Cart</Link>
        <Account />
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
