import Search from "@/components/Search";
import Nav from "@/components/Nav";
import Link from "next/link";
import { styled } from "styled-components";
import Account from "@/components/Account";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
export default function Header() {
  const cart = useSelector((store: any) => store.cart);
  // const headerRef: any = useRef();
  // const sectionRef: any = useRef();
  // useEffect(() => {
  //   const observerInstance = new IntersectionObserver((entries, observer) => {
  //     console.log({ entries, observer });
  //   });
  //   observerInstance.observe(headerRef.current);
  //   observerInstance.observe(sectionRef.current);
  // }, []);
  return (
    <Box
    // ref={headerRef}
    >
      <section
      // ref={sectionRef}
      >
        {/* <Link href={"/"}>Logo</Link> */}
        <Nav />
        <Search />
        <Link href={"/cart"}>Cart ({cart.length})</Link>
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
