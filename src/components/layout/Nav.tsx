import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
// import { Squeeze as Hamburger } from "hamburger-react";
import { IoIosArrowForward, IoIosMenu } from "react-icons/io";
import AccountIcon from "@/components/auth/AccountIcon";

export default function Nav() {
  const [isVisible, setIsVisible]: any = useState(false);
  // console.log({ router });
  // const [categoryToggle, setCategoryToggle]: any = useState(false);
  // const [shopToggle, setShopToggle]: any = useState(false);
  // const handleCategoryToggle = (e: any) => {
  //   e.stopPropagation();
  //   setCategoryToggle((value: boolean) => !value);
  // };
  const handleToggle = (e: any) => {
    e.stopPropagation();
    setIsVisible((value: boolean) => !value);
    // setShopToggle((value: boolean) => !value);
  };
  // useEffect(() => {
  //   const handleClose = () => setIsVisible(false);
  //   window.addEventListener("click", handleClose);
  //   return () => window.removeEventListener("click", handleClose);
  //   // window.addEventListener("click", () => setCategoryToggle(false));
  //   // window.addEventListener("click", () => setShopToggle(false));
  // }, []);
  return (
    <Box>
      <div id="nav-belt-outer">
        <div id="nav-belt">
          <div id="nav-belt-left">
            <div id="nav-logo">
              <Link href={"/"}>Logo</Link>
            </div>
          </div>
          <div id="nav-belt-center"></div>
          <div id="nav-belt-right">
            <AccountIcon />
            {/* <div id="nav-tools">
            <div id="nav-account"></div>
            <div id="nav-orders"></div>
            <div id="nav-cart">
              <span id="nav-cart-count"></span>
              <span id="nav-cart-icon"></span>
            </div>
          </div> */}
          </div>
        </div>
      </div>
      <div id="nav-main-outer">
        <div id="nav-main">
          <div id="nav-main-left">
            <button id="nav-hamburger" onClick={() => setIsVisible(true)}>
              <IoIosMenu />
              <div>All</div>
            </button>
          </div>
          <div id="nav-main-center"></div>
          <div id="nav-main-right"></div>
        </div>
      </div>
      <div
        className={`nav-side-outer ${isVisible ? "visible" : ""}`}
        onClick={() => setIsVisible(false)}
      >
        <div
          className={`nav-side ${isVisible ? "visible" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="nav-side-content">
            <ul className="nav-side-menu">
              <li className="nav-side-item">
                <Link href={"/shop/all"} onClick={() => setIsVisible(false)}>
                  <div>All Products</div>
                  <IoIosArrowForward />
                </Link>
              </li>
              <li className="nav-side-item">
                <Link href={"/#"}>
                  <div>Item 1</div>
                  <IoIosArrowForward />
                </Link>
              </li>
              <li className="nav-side-item">
                <Link href={"/#"}>
                  <div>Item 1</div>
                  <IoIosArrowForward />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <button onClick={handleToggle}>Shop</button> */}
      {/* {isVisible && (
            <ul className="sub">
              <li>
                <Link href={"/shop/all"}>All Products</Link>
              </li>
              <li>
                <Link href={"/shop/electronics"}>Electronics</Link>
              </li>
              <li>
                <Link href={"/shop/fashion"}>Fashion</Link>
              </li>
              <li>
                <Link href={"/shop/food"}>Food</Link>
              </li>
            </ul>
          )} */}
      {/* <li className="shop">
        </li> */}
    </Box>
  );
}

const Box = styled.nav`
  /* search, cart, order... */
  #nav-belt-outer {
    background-color: rgba(19, 25, 33, 0.7);
  }
  #nav-belt {
    width: 80%;
    max-width: 1000px;
    height: 60px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #nav-belt-left {
      #nav-logo {
        height: 100%;
      }
    }
    #nav-belt-center {
      background-color: black;
      flex: 0.5;
    }
    #nav-belt-right {
      height: 100%;
      > * {
        /* Account Component */
        height: 100%;
      }
    }
    a {
      padding: 1rem;
    }
  }

  /* main navigation */
  #nav-main-outer {
    background-color: rgb(35, 47, 62, 0.7);
  }
  #nav-main {
    width: 80%;
    max-width: 1000px;
    height: 40px;
    margin: auto;
    /* border: 2px solid coral; */
    #nav-main-left {
      height: 100%;
      display: flex;
      gap: 1rem;
      #nav-hamburger {
        height: 100%;
        /* outline: 2px solid red; */
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 1rem;
      }
    }
    a {
      padding: 0.5rem;
    }
  }

  /* side navigation */
  .nav-side-outer {
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
    a {
      justify-content: space-between;
      &:hover {
        color: initial;
      }
    }
  }
  .nav-side {
    width: 300px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    color: #000;
    padding: 3rem 0;
    transform: translateX(-100%);
    transition: transform 0.3s;
    &.visible {
      transform: translateX(0%);
    }
    .nav-side-item {
      /* outline: 2px solid; */
      a {
        padding: 1rem;
      }
      svg {
        color: #777;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        a svg {
          color: #000;
        }
      }
    }
  }

  /* public */
  a {
    display: flex;
    align-items: center;
  }
`;
// <li className="category" style={{ display: "none" }}>
// <button onClick={handleCategoryToggle}>Category</button>
// {categoryToggle && (
//   <ul
//     className="sub"
//     // 고전적인 방식 (className에 active를 추가)
//     // {/* <ul className={`sub ${categoryToggle ? "active" : ""}`}> */}
//     // {/* main의 item이 여러개 일때, 그 item의 sub를 active or unactive 해야할 경우, sub를 선택할 때, useRef를 사용하자 */}
//     // {/* <ul className="sub" ref={shopSubRef}> */}
//   >
//     <li>
//       <Link href={"/category/all"}>All Products</Link>
//     </li>
//     <li>
//       <Link href={"/category/electronics"}>Electronics</Link>
//     </li>
//     <li>
//       <Link href={"/category/fashion"}>Fashion</Link>
//     </li>
//     <li>
//       <Link href={"/category/food"}>Food</Link>
//     </li>
//   </ul>
// )}
// </li>
