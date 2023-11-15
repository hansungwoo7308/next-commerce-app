import Background from "@/components/layout/Background";
import { setBackground } from "lib/client/store/backgroundSlice";
import { setSideMenu } from "lib/client/store/sideMenu";
import { getData } from "lib/public/fetchData";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function NavSideProductMenu({ isClicked, setIsClicked }: any) {
  // external
  const sideMenu = useSelector((store: any) => store.sideMenu);
  const dispatch = useDispatch();

  return (
    <>
      <Background />
      <Box
        className={`nav-side-product-menu ${sideMenu ? "move-in-screen" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          <li>
            <Link href={"/products"} onClick={() => dispatch(setSideMenu(false))}>
              <div>All Products</div>
              <IoIosArrowForward />
            </Link>
          </li>
          <li>
            <Link
              href={"/products?category=furnitures"}
              onClick={() => dispatch(setSideMenu(false))}
            >
              <div>Furnitures</div>
              <IoIosArrowForward />
            </Link>
          </li>
          <li>
            <Link
              href={"/products?category=cosmetics"}
              onClick={() => dispatch(setSideMenu(false))}
            >
              <div>Cosmetics</div>
              <IoIosArrowForward />
            </Link>
          </li>
          <li>
            <Link href={"/products?category=fashion"} onClick={() => dispatch(setSideMenu(false))}>
              <div>Fashion</div>
              <IoIosArrowForward />
            </Link>
          </li>
        </ul>
        <hr />
      </Box>
    </>
  );
  // return (
  //   <Background
  //     className={`nav-side-background ${isClicked ? "visible" : ""}`}
  //     onClick={() => setIsClicked(false)}
  //   >
  //     <Box
  //       className={`nav-side-product-menu ${isClicked ? "move-in-screen" : ""}`}
  //       onClick={(e) => e.stopPropagation()}
  //     >
  //       <ul>
  //         <li>
  //           <Link href={"/products"} onClick={() => setIsClicked(false)}>
  //             <div>All Products</div>
  //             <IoIosArrowForward />
  //           </Link>
  //         </li>
  //         <li>
  //           <Link href={"/products?category=furnitures"} onClick={() => setIsClicked(false)}>
  //             <div>Furnitures</div>
  //             <IoIosArrowForward />
  //           </Link>
  //         </li>
  //         <li>
  //           <Link href={"/products?category=cosmetics"} onClick={() => setIsClicked(false)}>
  //             <div>Cosmetics</div>
  //             <IoIosArrowForward />
  //           </Link>
  //         </li>
  //         <li>
  //           <Link href={"/products?category=fashion"} onClick={() => setIsClicked(false)}>
  //             <div>Fashion</div>
  //             <IoIosArrowForward />
  //           </Link>
  //         </li>
  //       </ul>
  //       <hr />
  //     </Box>
  //   </Background>
  // );
}

const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 365px;
  max-width: 50%;
  height: 100vh;

  background-color: #fff;
  color: #000;
  padding: 3rem 2rem;
  z-index: 2000;

  /* move in screen */
  transform: translateX(-100%);
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