import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { IoIosArrowForward, IoIosGlobe, IoIosMenu } from "react-icons/io";
import AccountIcon from "@/components/auth/AccountIcon";
import { getData } from "lib/public/fetchData";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Search from "@/components/layout/Search";
// import { Squeeze as Hamburger } from "hamburger-react";

export default function Nav() {
  const cart = useSelector((store: any) => store.cart);

  const [isVisible, setIsVisible]: any = useState(false);

  return (
    <Box>
      <div className="nav-belt-outer section-outer">
        <section className="nav-belt">
          <div className="nav-belt-left">
            <div className="nav-logo">
              <Link href={"/"}>
                <IoIosGlobe size={30} />
              </Link>
            </div>
          </div>
          <div className="nav-belt-center">
            <Search />
          </div>
          <div className="nav-belt-right">
            <Link href={"/cart"}>
              <FaCartShopping /> <pre> ({cart.products?.length})</pre>
            </Link>
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
        </section>
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
                <Link href={"/products"} onClick={() => setIsVisible(false)}>
                  <div>All Products</div>
                  <IoIosArrowForward />
                </Link>
              </li>
              <li className="nav-side-item">
                <Link href={"/products?category=furnitures"} onClick={() => setIsVisible(false)}>
                  <div>Furnitures</div>
                  <IoIosArrowForward />
                </Link>
              </li>
              <li className="nav-side-item">
                <Link href={"/products?category=cosmetics"} onClick={() => setIsVisible(false)}>
                  <div>Cosmetics</div>
                  <IoIosArrowForward />
                </Link>
              </li>
              <li className="nav-side-item">
                <Link href={"/products?category=fashion"} onClick={() => setIsVisible(false)}>
                  <div>Fashion</div>
                  <IoIosArrowForward />
                </Link>
              </li>
            </ul>
            <hr />
            <button
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const response = await getData("disconnect");
                  console.log({ response });
                } catch (error) {
                  console.log({ error });
                }
              }}
            >
              Disconnect database
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
}

const Box = styled.nav`
  /* search, cart, order... */
  .nav-belt-outer {
    background-color: rgba(19, 25, 33, 0.7);
    .nav-belt {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .nav-belt-left {
        .nav-logo {
          height: 100%;
        }
      }
      .nav-belt-center {
        background-color: black;
        flex: 0.5;
      }
      .nav-belt-right {
        height: 100%;
        display: flex;
        gap: 1rem;
        > * {
          /* Account Component */
          height: 100%;
        }
      }
      a {
        padding: 1rem;
      }
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
    width: 365px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    color: #000;
    padding: 3rem 2rem;
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
