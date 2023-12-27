import Link from "next/link";
import { styled } from "styled-components";
import { IoIosArrowForward, IoIosGlobe, IoIosMenu } from "react-icons/io";
import AccountIcon from "@/components/auth/AccountIcon";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Search from "@/components/layout/Search";
import { setSideMenu } from "lib/client/store/sideMenuSlice";
import { setBackground } from "lib/client/store/backgroundSlice";
// import { Squeeze as Hamburger } from "hamburger-react";

export default function Nav() {
  // external
  const cart = useSelector((store: any) => store.cart);
  const dispatch = useDispatch();

  const handleClickHamburgerButton = () => {
    dispatch(setBackground(true));
    dispatch(setSideMenu("product-menu"));
  };

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
      <div className="nav-main-outer">
        <section className="nav-main">
          <div id="nav-main-left">
            <button id="nav-hamburger" onClick={handleClickHamburgerButton}>
              <IoIosMenu />
              <div>All</div>
            </button>
          </div>
          <div id="nav-main-center"></div>
          <div id="nav-main-right"></div>
        </section>
      </div>
    </Box>
  );
}

const Box = styled.nav`
  /* search, cart, order... */
  .nav-belt-outer {
    /* background-color: rgba(19, 25, 33, 0.7); */

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
        flex: 0.5;
        background-color: transparent;
        /* border: 1px solid red; */
      }

      .nav-belt-right {
        height: 100%;
        display: flex;
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
  .nav-main-outer {
    /* background-color: rgb(35, 47, 62, 0.7); */
    color: #fff;

    .nav-main {
      width: 80%;
      max-width: 1000px;
      height: 40px;
      margin: auto;

      #nav-main-left {
        height: 100%;
        display: flex;
        gap: 1rem;

        #nav-hamburger {
          height: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1rem;
        }
      }
    }
  }

  a {
    display: flex;
    align-items: center;
    padding: 0.5rem;
  }

  button {
    color: inherit;
  }
`;
