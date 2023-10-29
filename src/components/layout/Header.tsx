import Nav from "@/components/layout/Nav";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

export default function Header() {
  const headerRef: any = useRef();
  const [previous, setPrevScrollY]: any = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", (context) => {
      const latest = window.scrollY;
      setPrevScrollY(latest);

      // console.log({ previous, currentScrollY: latest });

      // scroll down : previous < latest
      if (previous < latest && latest > 200) {
        // hidden
        headerRef.current.style.transform = "translateY(-300%)";
        headerRef.current.style.opacity = "0";
        headerRef.current.style.transition = "all 1s";
      }
      // scroll up : previous > latest
      else {
        // visible
        headerRef.current.style.transform = "translateY(0%)";
        headerRef.current.style.opacity = "1";
        headerRef.current.style.transition = "all 1s";
      }
    });
  }, [previous]);

  return (
    <Box ref={headerRef}>
      <section>
        <Nav />
      </section>
    </Box>
  );
}
const Box = styled.header`
  /* display: none; */
  > section {
    > .auth {
      display: flex;
    }
  }
`;
